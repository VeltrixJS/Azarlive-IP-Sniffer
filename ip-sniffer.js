(function () {
    // Helper pour créer les éléments HTML
    const createElement = (tag, options = {}, children = []) => {
        const el = document.createElement(tag);
        Object.assign(el, options);
        Object.entries(options.style || {}).forEach(([key, val]) => el.style[key] = val);
        children.forEach(child => el.appendChild(child));
        return el;
    };

    // Container principal
    const ipContainer = createElement('div', {
        id: 'ip-container',
        style: {
            position: 'fixed',
            top: '10px',
            right: '10px',
            width: '400px',
            maxHeight: '500px',
            overflowY: 'auto',
            backgroundColor: '#0d0d0d', // fond noir
            border: '1px solid #6a0dad', // violet
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
        <div style="margin-top:10px;text-align:center;">
            <a href="https://github.com/VeltrixJS" target="_blank" style="
                display:inline-flex;
                align-items:center;
                justify-content:center;
                gap:8px;
                background-color:#6a0dad;
                color:white;
                padding:8px 16px;
                text-decoration:none;
                font-weight:600;
                border-radius:6px;
                font-size:14px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
                transition: background-color 0.2s, transform 0.1s;
            " onmouseover="this.style.backgroundColor='#8e24aa'; this.style.transform='scale(1.05)';"
              onmouseout="this.style.backgroundColor='#6a0dad'; this.style.transform='scale(1)';">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 
                12 0 5.303 3.438 9.8 8.205 
                11.385.6.113.82-.258.82-.577 
                0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.084-.729.084-.729 
                1.205.084 1.84 1.236 1.84 1.236 
                1.07 1.835 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 
                0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 
                0 0 1.008-.322 3.301 1.23a11.5 
                11.5 0 013.003-.404c1.018.005 2.045.138 
                3.003.404 2.292-1.552 3.298-1.23 
                3.298-1.23.653 1.653.242 2.873.118 
                3.176.77.84 1.235 1.911 1.235 3.221 
                0 4.61-2.803 5.624-5.475 5.921.43.372.823 
                1.102.823 2.222 0 1.606-.015 2.896-.015 
                3.286 0 .319.218.694.825.576C20.565 
                22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              Suivez-moi sur GitHub
            </a>
        </div>
    `;
    document.body.appendChild(ipContainer);

    // Boutons
    document.getElementById('clear-ip-list').onclick = () => {
        document.getElementById('ip-addresses').innerHTML = '';
    };
    document.getElementById('close-ip-container').onclick = () => {
        ipContainer.remove();
    };

    // Draggable
    function makeDraggable(el, handle) {
        let posX = 0, posY = 0, mouseX = 0, mouseY = 0;
        handle.onmousedown = (e) => {
            e.preventDefault();
            mouseX = e.clientX;
            mouseY = e.clientY;
            document.onmouseup = () => document.onmousemove = null;
            document.onmousemove = (e) => {
                e.preventDefault();
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

    // Interception WebRTC
    const shownIPs = new Set(); // évite doublons
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

                        const ipItem = document.createElement('div');
                        ipItem.className = 'ip-item';
                        ipItem.style.cssText = `
                            display: flex; flex-direction: column;
                            background-color: #1a1a1a;
                            border: 1px solid #6a0dad;
                            padding: 15px; margin-bottom: 10px;
                            border-radius: 8px; box-shadow: 0 2px 6px rgba(106,13,173,0.5);
                            transition: transform 0.2s, box-shadow 0.2s;
                            cursor: pointer;
                            color: #e0e0e0;
                        `;
                        ipItem.onmouseover = () => {
                            ipItem.style.transform = 'scale(1.02)';
                            ipItem.style.boxShadow = '0 4px 12px rgba(138,43,226,0.6)';
                        };
                        ipItem.onmouseout = () => {
                            ipItem.style.transform = 'scale(1)';
                            ipItem.style.boxShadow = '0 2px 6px rgba(106,13,173,0.5)';
                        };

                        const time = new Date().toLocaleTimeString();
                        ipItem.innerHTML = `
                            <span><strong style="color:#bb86fc;">Time:</strong> ${time}</span>
                            <span><strong style="color:#bb86fc;">IP:</strong> ${ip}</span>
                            <span><strong style="color:#bb86fc;">ISP:</strong> ${data.org || 'Unknown ISP'}</span>
                            <span><strong style="color:#bb86fc;">City:</strong> ${data.city || 'Unknown City'}</span>
                            <button style="margin-top:10px;padding:10px 15px;border:none;background-color:#6a0dad;color:white;border-radius:8px;cursor:pointer;">Copy</button>
                        `;

                        const copyBtn = ipItem.querySelector('button');
                        copyBtn.onclick = () => {
                            navigator.clipboard.writeText(ip).then(() => {
                                copyBtn.textContent = 'Copied!';
                                copyBtn.style.backgroundColor = '#28a745';
                                setTimeout(() => {
                                    copyBtn.textContent = 'Copy';
                                    copyBtn.style.backgroundColor = '#6a0dad';
                                }, 2000);
                            });
                        };

                        document.getElementById('ip-addresses').appendChild(ipItem);
                    }
                }
            } catch (err) {
                console.error('[WebRTC] Error handling ICE candidate:', err);
            }

            return pc.oaddIceCandidate(iceCandidate, ...rest);
        };

        return pc;
    };
})();
