(function () {
    const createElement = (tag, options = {}, children = []) => {
        const el = document.createElement(tag);
        Object.assign(el, options);
        Object.entries(options.style || {}).forEach(([key, val]) => el.style[key] = val);
        children.forEach(child => el.appendChild(child));
        return el;
    };

    const ipContainer = createElement('div', {
        id: 'ip-container',
        style: {
            position: 'fixed',
            top: '10px',
            right: '10px',
            width: '400px',
            maxHeight: '500px',
            backgroundColor: '#0d0d0d',
            border: '1px solid #6a0dad',
            borderRadius: '12px',
            padding: '20px',
            zIndex: '10000',
            fontFamily: 'Arial, sans-serif',
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(106, 13, 173, 0.6)',
            color: '#e0e0e0',
            resize: 'both',
            overflow: 'auto',
        }
    });

    ipContainer.innerHTML = `
        <div id="drag-handle" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;cursor:move;">
            <h3 style="margin:0;color:#bb86fc;">Detected IP Addresses</h3>
            <div>
                <button id="clear-ip-list" style="margin-right:5px;padding:10px 15px;border:none;background-color:#6a0dad;color:white;border-radius:8px;cursor:pointer;">Clear</button>
                <button id="close-ip-container" style="padding:10px 15px;border:none;background-color:#6a0dad;color:white;border-radius:8px;cursor:pointer;">X</button>
            </div>
        </div>
        <div id="ip-addresses"></div>
    `;
    document.body.appendChild(ipContainer);

    document.getElementById('clear-ip-list').onclick = () => {
        document.getElementById('ip-addresses').innerHTML = '';
    };
    document.getElementById('close-ip-container').onclick = () => {
        ipContainer.remove();
    };

    function makeDraggable(el, handle) {
        let posX = 0, posY = 0, mouseX = 0, mouseY = 0;
        handle.onmousedown = (e) => {
            e.preventDefault();
            mouseX = e.clientX;
            mouseY = e.clientY;
            document.onmouseup = () => document.onmousemove = null;
            document.onmousemove = (e) => {
                posX = mouseX - e.clientX;
                posY = mouseY - e.clientY;
                mouseX = e.clientX;
                mouseY = e.clientY;
                el.style.top = (el.offsetTop - posY) + "px";
                el.style.left = (el.offsetLeft - posX) + "px";
            };
        };
    }
    makeDraggable(ipContainer, document.getElementById('drag-handle'));

    const shownIPs = new Set();
    window.oRTCPeerConnection = window.oRTCPeerConnection || window.RTCPeerConnection;

    window.RTCPeerConnection = function (...args) {
        const pc = new window.oRTCPeerConnection(...args);
        pc.oaddIceCandidate = pc.addIceCandidate;

        pc.addIceCandidate = async function (iceCandidate, ...rest) {
            try {
                if (iceCandidate && iceCandidate.candidate) {
                    const fields = iceCandidate.candidate.split(' ');
                    if (fields[7] === 'srflx') {
                        const ip = fields[4];
                        if (shownIPs.has(ip)) return pc.oaddIceCandidate(iceCandidate, ...rest);
                        shownIPs.add(ip);

                        const res = await fetch(`https://ipapi.co/${ip}/json/`);
                        const data = await res.json();

                        const city = data.city || 'Unknown City';
                        const region = data.region || 'Unknown Department';
                        const postal = data.postal || '';
                        const departmentNumber = postal ? postal.substring(0, 2) : '??';
                        const country = data.country_name || '';

                        const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(
                            city + ' ' + region + ' ' + departmentNumber + ' ' + country
                        )}`;


                        const ipItem = document.createElement('div');
                        ipItem.style.cssText = `
                            display: flex;
                            flex-direction: column;
                            background-color: #1a1a1a;
                            border: 1px solid #6a0dad;
                            padding: 15px;
                            margin-bottom: 10px;
                            border-radius: 8px;
                            box-shadow: 0 2px 6px rgba(106,13,173,0.5);
                            color: #e0e0e0;
                        `;

                        const time = new Date().toLocaleTimeString();
                        ipItem.innerHTML = `
                            <span><strong style="color:#bb86fc;">Time:</strong> ${time}</span>
                            <span><strong style="color:#bb86fc;">IP:</strong> ${ip}</span>
                            <span><strong style="color:#bb86fc;">ISP:</strong> ${data.org || 'Unknown ISP'}</span>
                            <span>
                              <strong style="color:#bb86fc;">Location:</strong>
                              ${city} (${region} – ${departmentNumber})
                            </span>


                            <div style="display:flex;gap:8px;margin-top:10px;">
                                <button class="copy-btn" style="flex:1;padding:10px;border:none;background:#6a0dad;color:white;border-radius:8px;cursor:pointer;">Copy IP</button>
                                <button class="maps-btn" style="flex:1;padding:10px;border:none;background:#1e88e5;color:white;border-radius:8px;cursor:pointer;">Google Maps</button>
                            </div>
                        `;

                        ipItem.querySelector('.copy-btn').onclick = () => {
                            navigator.clipboard.writeText(ip);
                        };

                        ipItem.querySelector('.maps-btn').onclick = () => {
                            window.open(mapsUrl, '_blank');
                        };

                        document.getElementById('ip-addresses').appendChild(ipItem);
                    }
                }
            } catch (err) {
                console.error('[WebRTC] Error:', err);
            }
            return pc.oaddIceCandidate(iceCandidate, ...rest);
        };
        return pc;
    };
})();
