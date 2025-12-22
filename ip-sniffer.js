// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2025-12-22
// @description  try to take over the world!
// @author       You
// @match        https://azarlive.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=azarlive.com
// @grant        none
// ==/UserScript==

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
        <div id="drag-handle" style="cursor:move;margin-bottom:20px;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">
                <h3 style="margin:0;color:#bb86fc;">Detected IP Addresses</h3>
                <div style="display:flex;gap:8px;">
                    <button id="open-popup" style="padding:10px 15px;border:none;background-color:#1e88e5;color:white;border-radius:8px;cursor:pointer;font-weight:600;white-space:nowrap;">📺 2ème écran</button>
                    <button id="close-ip-container" style="padding:10px 15px;border:none;background-color:#6a0dad;color:white;border-radius:8px;cursor:pointer;font-weight:bold;">X</button>
                </div>
            </div>
        </div>
        <div id="ip-addresses"></div>
        <div style="margin-top:10px;text-align:center;"> <a href="https://github.com/VeltrixJS" target="_blank" style=" display:inline-flex; align-items:center; justify-content:center; gap:8px; background-color:#6a0dad; color:white; padding:8px 16px; text-decoration:none; font-weight:600; border-radius:6px; font-size:14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; transition: background-color 0.2s, transform 0.1s; " onmouseover="this.style.backgroundColor='#8e24aa'; this.style.transform='scale(1.05)';" onmouseout="this.style.backgroundColor='#6a0dad'; this.style.transform='scale(1)';"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 24 24"> <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 013.003-.404c1.018.005 2.045.138 3.003.404 2.292-1.552 3.298-1.23 3.298-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .319.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/> </svg> Suivez-moi sur GitHub </a> </div>
    `;
    document.body.appendChild(ipContainer);

    const miniContainer = createElement('div', {
        id: 'mini-ip-container',
        style: {
            position: 'fixed',
            top: '10px',
            right: '10px',
            width: '60px',
            height: '60px',
            backgroundColor: '#0d0d0d',
            border: '2px solid #6a0dad',
            borderRadius: '50%',
            zIndex: '10000',
            cursor: 'pointer',
            display: 'none',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '24px',
            boxShadow: '0 4px 12px rgba(106, 13, 173, 0.6)',
        }
    });
    miniContainer.innerHTML = '<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8Y2lyY2xlIGN4PSIyNTYiIGN5PSIyNTYiIHI9IjI0MCIgc3Ryb2tlPSIjYmI4NmZjIiBzdHJva2Utd2lkdGg9IjgiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTI1NiAxNDBDMjA0IDE0MCAxNjAgMTg0IDE2MCAyMzZDMTYwIDI4OCAyMDQgMzMyIDI1NiAzMzJDMzA4IDMzMiAzNTIgMjg4IDM1MiAyMzZDMzUyIDE4NCAzMDggMTQwIDI1NiAxNDAiIHN0cm9rZT0iI2JiODZmYyIgc3Ryb2tlLXdpZHRoPSI4IiBmaWxsPSJub25lIi8+CjxwYXRoIGQ9Ik0yMzAgMzYwTDI1NiA0MDBMMjgyIDM2MEgyMzBaIiBmaWxsPSIjYmI4NmZjIi8+CjxyZWN0IHg9IjE5MCIgeT0iMjEwIiB3aWR0aD0iMTMyIiBoZWlnaHQ9IjUyIiByeD0iOCIgc3Ryb2tlPSIjYmI4NmZjIiBzdHJva2Utd2lkdGg9IjYiIGZpbGw9Im5vbmUiLz4KPHRleHQgeD0iMjU2IiB5PSIyNDUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIzNiIgZmlsbD0iI2JiODZmYyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SUAgPC90ZXh0Pgo8L3N2Zz4=" style="width:50px;height:50px;"/>';
    document.body.appendChild(miniContainer);

    let popupWindow = null;

    function setupEventListeners() {
        document.getElementById('open-popup').onclick = () => {
            if (popupWindow && !popupWindow.closed) {
                popupWindow.focus();
                return;
            }

            popupWindow = window.open('', 'IPTracker', 'width=380,height=350,left=100,top=100');

            popupWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>IP Tracker</title>
                    <style>
                        body {
                            margin: 0;
                            padding: 20px;
                            background-color: #0d0d0d;
                            font-family: Arial, sans-serif;
                            color: #e0e0e0;
                        }
                        #ip-container {
                            background-color: #0d0d0d;
                            border: 1px solid #6a0dad;
                            borderRadius: 12px;
                            padding: 20px;
                            boxShadow: 0 4px 12px rgba(106, 13, 173, 0.6);
                        }
                        h3 {
                            margin: 0 0 20px 0;
                            color: #bb86fc;
                        }
                        button {
                            padding: 10px 15px;
                            border: none;
                            background-color: #6a0dad;
                            color: white;
                            border-radius: 8px;
                            cursor: pointer;
                            margin-right: 5px;
                        }
                        button:hover {
                            background-color: #8e24aa;
                        }
                        .ip-item {
                            display: flex;
                            flex-direction: column;
                            background-color: #1a1a1a;
                            border: 1px solid #6a0dad;
                            padding: 15px;
                            margin-bottom: 10px;
                            border-radius: 8px;
                            box-shadow: 0 2px 6px rgba(106,13,173,0.5);
                        }
                        .ip-item span {
                            margin-bottom: 5px;
                        }
                        .ip-item strong {
                            color: #bb86fc;
                        }
                        .ip-buttons {
                            display: flex;
                            gap: 8px;
                            margin-top: 10px;
                        }
                        .ip-buttons button {
                            flex: 1;
                        }
                        .maps-btn {
                            background: #1e88e5 !important;
                        }
                    </style>
                </head>
                <body>
                    <div id="ip-container">
                        <h3>Detected IP Addresses</h3>
                        <div id="ip-addresses"></div>
                        <div style="margin-top:10px;text-align:center;">
                            <a href="https://github.com/VeltrixJS" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;gap:4px;background-color:#6a0dad;color:white;padding:5px 10px;text-decoration:none;font-weight:600;border-radius:6px;font-size:11px;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="white" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 013.003-.404c1.018.005 2.045.138 3.003.404 2.292-1.552 3.298-1.23 3.298-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .319.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                                GitHub
                            </a>
                        </div>
                    </div>
                </body>
                </html>
            `);

            popupWindow.document.close();
        };

        document.getElementById('close-ip-container').onclick = () => {
            miniContainer.style.top = ipContainer.offsetTop + 'px';
            miniContainer.style.left = ipContainer.offsetLeft + 'px';
            ipContainer.style.display = 'none';
            miniContainer.style.display = 'flex';
        };
    }

    setupEventListeners();

    function makeDraggable(el, handle) {
        let posX = 0, posY = 0, mouseX = 0, mouseY = 0;
        let isDragging = false;
        let startX = 0, startY = 0;

        handle.onmousedown = (e) => {
            e.preventDefault();
            isDragging = false;
            startX = e.clientX;
            startY = e.clientY;
            mouseX = e.clientX;
            mouseY = e.clientY;
            document.onmouseup = () => {
                document.onmousemove = null;
                if (!isDragging && el.id === 'mini-ip-container') {
                    ipContainer.style.top = miniContainer.offsetTop + 'px';
                    ipContainer.style.left = miniContainer.offsetLeft + 'px';
                    ipContainer.style.display = 'block';
                    miniContainer.style.display = 'none';
                    setupEventListeners();
                }
            };
            document.onmousemove = (e) => {
                if (Math.abs(e.clientX - startX) > 5 || Math.abs(e.clientY - startY) > 5) {
                    isDragging = true;
                }
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
    makeDraggable(miniContainer, miniContainer);

    let currentIP = null;
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
                        if (currentIP === ip) return pc.oaddIceCandidate(iceCandidate, ...rest);
                        currentIP = ip;

                        document.getElementById('ip-addresses').innerHTML = '';
                        if (popupWindow && !popupWindow.closed) {
                            popupWindow.document.getElementById('ip-addresses').innerHTML = '';
                        }

                        const res = await fetch(`https://ipapi.co/${ip}/json/`, {
                            method: 'GET',
                            headers: {
                                'User-Agent': 'Mozilla/5.0'
                            }
                        });
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

                        if (popupWindow && !popupWindow.closed) {
                            const popupHTML = `
                                <div class="ip-item">
                                    <span><strong>Time:</strong> ${time}</span>
                                    <span><strong>IP:</strong> ${ip}</span>
                                    <span><strong>ISP:</strong> ${data.org || 'Unknown ISP'}</span>
                                    <span><strong>Location:</strong> ${city} (${region} – ${departmentNumber})</span>
                                    <div class="ip-buttons">
                                        <button onclick="navigator.clipboard.writeText('${ip}')">Copy IP</button>
                                        <button class="maps-btn" onclick="window.open('${mapsUrl}', '_blank')">Google Maps</button>
                                    </div>
                                </div>
                            `;
                            popupWindow.document.getElementById('ip-addresses').innerHTML += popupHTML;
                        }

                        const logEntry = {
                            timestamp: new Date().toISOString(),
                            ip: ip,
                            isp: data.org || 'Unknown ISP',
                            city: city,
                            region: region,
                            departmentNumber: departmentNumber,
                            country: country
                        };
                        localStorage.setItem('current_call_ip', JSON.stringify(logEntry));
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
