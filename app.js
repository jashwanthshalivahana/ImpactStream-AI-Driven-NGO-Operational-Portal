document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. INBOUND URL REFFERAL PARSING (Step 4 Data Architecture)
    // ==========================================================================
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    const refPill = document.getElementById('referral-tracking-pill');
    const refDisplay = document.getElementById('tracking-node-id');

    if (refCode) {
        sessionStorage.setItem('active_referral_node', refCode.trim().toUpperCase());
        refDisplay.textContent = refCode.trim().toUpperCase();
        refPill.classList.add('active');
    } else if (sessionStorage.getItem('active_referral_node')) {
        refDisplay.textContent = sessionStorage.getItem('active_referral_node');
        refPill.classList.add('active');
    }

    // ==========================================================================
    // 2. DYNAMIC PARTICLES ENGINE
    // ==========================================================================
    const particleSpace = document.getElementById('dust-vector-field');
    const totalParticlesCount = 25;

    for (let i = 0; i < totalParticlesCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'organic-dust-node';
        
        const dimensions = Math.random() * 6 + 4; 
        particle.style.width = `${dimensions}px`;
        particle.style.height = `${dimensions}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 18}s`;
        
        const randomDriftX = (Math.random() * 180 - 90) + 'px';
        particle.style.setProperty('--target-drift-x', randomDriftX);
        
        particleSpace.appendChild(particle);
    }

    window.addEventListener('mousemove', (e) => {
        const cursorX = e.clientX;
        const cursorY = e.clientY;
        const allParticles = document.querySelectorAll('.organic-dust-node');
        
        allParticles.forEach(p => {
            const pBounds = p.getBoundingClientRect();
            const pCenterX = pBounds.left + (pBounds.width / 2);
            const pCenterY = pBounds.top + (pBounds.height / 2);
            const distX = pCenterX - cursorX;
            const distY = pCenterY - cursorY;
            const distance = Math.sqrt(distX * distX + distY * distY);
            
            if (distance < 200) {
                const forceVector = (200 - distance) / 200; 
                const pushX = (distX / distance) * forceVector * 30;
                const pushY = (distY / distance) * forceVector * 30;
                
                p.style.transform = `translate3d(${pushX}px, ${pushY}px, 0)`;
                p.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            }
        });
    });

    // ==========================================================================
    // 3. STORAGE LAYER SCHEMAS (Flat-File DB Cache Mirroring)
    // ==========================================================================
    if (!localStorage.getItem('db_volunteers')) {
        localStorage.setItem('db_volunteers', JSON.stringify([
            { timestamp: "2026-06-12 14:22:05", name: "Aarav Mehta", email: "aarav@uni.edu", phone: "+91 94906 74911" },
            { timestamp: "2026-06-13 09:11:45", name: "Diya Sharma", email: "diya.s@domain.com", phone: "+91 94906 74912" }
        ]));
    }
    if (!localStorage.getItem('db_escalations')) {
        localStorage.setItem('db_escalations', JSON.stringify([
            { timestamp: "2026-06-11 18:40:12", question: "Does the 80G certificate map directly to corporate corporate CSR matching tracks?" }
        ]));
    }

    // ==========================================================================
    // 4. LOWERED THRESHOLD VIEWPORT INTERSECTION SCROLLING LOGIC
    // ==========================================================================
    const slides = document.querySelectorAll('.spatial-slide');
    const anchors = document.querySelectorAll('.nav-anchor');
    const indicatorPill = document.getElementById('nav-indicator-pill');

    function layoutNavbarTrackerPill(activeLink) {
        if (!activeLink) return;
        indicatorPill.style.left = `${activeLink.offsetLeft}px`;
        indicatorPill.style.width = `${activeLink.offsetWidth}px`;
    }

    setTimeout(() => layoutNavbarTrackerPill(document.querySelector('.nav-anchor.active')), 150);

    window.addEventListener('scroll', () => {
        const scrolledDistance = window.scrollY;
        const windowViewportHeight = window.innerHeight;

        slides.forEach((slide) => {
            const currentSlideTop = slide.offsetTop;
            const deltaOffset = scrolledDistance - currentSlideTop;

            if (deltaOffset > -windowViewportHeight && deltaOffset < windowViewportHeight) {
                const targetPercentage = deltaOffset / windowViewportHeight;
                const imageTranslateY = targetPercentage * (windowViewportHeight * 0.12);
                
                const maskImage = slide.querySelector('.parallax-image-mask');
                if (maskImage) {
                    maskImage.style.transform = `scale(1.05) translate3d(0, ${imageTranslateY}px, 0)`;
                }
            }
        });
    });

    // Lowered Intersection threshold (0.15) triggers much faster to instantly fix the flickering bug
    const slideObserverOptions = {
        root: null, 
        threshold: 0.15, 
        rootMargin: "-5% 0px -5% 0px"
    };

    const slideStateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                slides.forEach(s => s.classList.remove('active-view'));
                entry.target.classList.add('active-view');

                const activeSectionIndex = Array.from(slides).indexOf(entry.target);
                
                anchors.forEach(anchor => {
                    if (parseInt(anchor.getAttribute('data-slide')) === activeSectionIndex) {
                        anchor.classList.add('active');
                        layoutNavbarTrackerPill(anchor);
                    } else {
                        anchor.classList.remove('active');
                    }
                });
            }
        });
    }, slideObserverOptions);

    slides.forEach(slide => slideStateObserver.observe(slide));

    anchors.forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSlideIndex = parseInt(anchor.getAttribute('data-slide'));
            const destinationOffset = slides[targetSlideIndex].offsetTop;
            
            window.scrollTo({
                top: destinationOffset,
                behavior: 'smooth'
            });
        });
    });

    window.addEventListener('resize', () => layoutNavbarTrackerPill(document.querySelector('.nav-anchor.active')));

    // ==========================================================================
    // 5. ASYMMETRICAL INTERACTIVE ELEMENT TILT SYSTEM
    // ==========================================================================
    const tiltCards = document.querySelectorAll('.tilt-target');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const maxTiltAngle = 6; 
            const rotateX = ((centerY - mouseY) / centerY) * maxTiltAngle;
            const rotateY = ((mouseX - centerX) / centerX) * maxTiltAngle;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });

    // ==========================================================================
    // 6. VOLUNTEER REGISTRY FORM TRACKING
    // ==========================================================================
    const volunteerForm = document.getElementById('volunteer-submission-form');
    
    volunteerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameVal = document.getElementById('v-name').value.trim();
        const emailVal = document.getElementById('v-email').value.trim();
        const phoneVal = document.getElementById('v-phone').value.trim();
        const reasonVal = document.getElementById('v-reason').value.trim();
        
        const now = new Date();
        const timestampStr = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0') + ' ' + String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0') + ':' + String(now.getSeconds()).padStart(2, '0');
        
        const newRecord = {
            timestamp: timestampStr,
            name: nameVal,
            email: emailVal,
            phone: phoneVal || "N/A"
        };
        
        const currentLogs = JSON.parse(localStorage.getItem('db_volunteers'));
        currentLogs.push(newRecord);
        localStorage.setItem('db_volunteers', JSON.stringify(currentLogs));
        
        alert(`Thank you, ${nameVal}. Your application parameters have been safely saved to our localized session datastore registry logs.`);
        
        const activeRef = sessionStorage.getItem('active_referral_node');
        if (activeRef) {
            sessionStorage.removeItem('active_referral_node');
            refPill.classList.remove('active');
        }
        
        volunteerForm.reset();
        refreshAdminTables();
    });

    // ==========================================================================
    // 7. REAL-TIME DONATION INTERACTION CHANNELS & SOCIAL DISPLAY LEDGERS
    // ==========================================================================
    const donationCards = document.querySelectorAll('.editorial-pricing-card:not(#custom-donation-card)');
    
    donationCards.forEach(card => {
        card.addEventListener('click', () => {
            const amt = card.getAttribute('data-amount');
            alert(`Simulating secure transaction channel connection for tier: ₹${amt}. Checkout parameters generated.`);
        });
    });

    document.getElementById('custom-pay-trigger').addEventListener('click', () => {
        const customAmt = document.getElementById('custom-amt-field').value;
        alert(`Simulating secure transaction channel connection for parameter amount: ₹${customAmt}. Checkout parameters generated.`);
    });

    const tickerTrack = document.getElementById('ticker-target-track');
    const mockDonors = [
        { donor: "Aarav M. (Hyderabad)", amount: "1,000", delta: "2 mins ago" },
        { donor: "Sneha R. (Mumbai)", amount: "500", delta: "12 mins ago" },
        { donor: "Kabir S. (Bengaluru)", amount: "100", delta: "1 hr ago" }
    ];

    mockDonors.forEach(item => {
        const row = document.createElement('div');
        row.className = 'ticker-card';
        row.innerHTML = `<span><strong>${item.donor}</strong> transferred verified solidarity tracking block of <strong>₹${item.amount}</strong></span><span class='ticker-time'>⏱     ${item.delta}</span>`;
        tickerTrack.appendChild(row);
    });

    // ==========================================================================
    // 8. LIVE GROQ API REASONING PLATFORM ENGINE (Hardcoded API Clearance Matrix)
    // ==========================================================================
    const chatScroller = document.getElementById('chat-scroller');
    const chatInput = document.getElementById('chat-input-field');
    const chatSendBtn = document.getElementById('chat-send-trigger');
    
    const groqApiKey = " Your_api_key"; // Insert Groq API Key here with strict read-only permissions for the llama-3.1-8b-instant model
    const fallbackResponseText = "I'm sorry, I don't have that information. I have forwarded your question to our admin team, and they will reply via email within 24 hours.";

    let conversationHistory = [];

    async function handleOutgoingChatMessage() {
        const userQuery = chatInput.value.trim();
        if (!userQuery) return;
        
        const uBubble = document.createElement('div');
        uBubble.className = 'chat-bubble bubble-user';
        uBubble.textContent = userQuery;
        chatScroller.appendChild(uBubble);
        
        chatInput.value = '';
        chatScroller.scrollTop = chatScroller.scrollHeight;
        
        conversationHistory.push({ role: "user", content: userQuery });
        
        const aBubble = document.createElement('div');
        aBubble.className = 'chat-speech-bubble bubble-ai';
        aBubble.innerHTML = `<span style="opacity: 0.5; font-style: italic;">Processing...</span>`;
        chatScroller.appendChild(aBubble);
        chatScroller.scrollTop = chatScroller.scrollHeight;

        const systemInstruction = `
        You are the calibrated automated expert virtual assistant representing NayePankh Foundation.
        Core Context: NayePankh is a registered UP-government youth-led NGO targeting 12A and 80G tax-exempt operations across India.
        - If the user explicitly asks about joining, field roles, or volunteering, route them to select the "Volunteering" menu item.
        - If the user explicitly asks about financial contributions, support, or money, instruct them to select the "Support Us" donation tiers.
        - Strict Boundary Condition: If the user asks something completely outside NGO workflows, or seeks variables you do not have verified knowledge of, you MUST explicitly output this sequence verbatim and absolutely nothing else:
        "${fallbackResponseText}"
        `;

        try {
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${groqApiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'llama-3.1-8b-instant',
                    messages: [
                        { role: 'system', content: systemInstruction },
                        ...conversationHistory
                    ],
                    temperature: 0.15, 
                    max_tokens: 300
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP Error Status: ${response.status}`);
            }

            const data = await response.json();
            const computedReply = data.choices[0].message.content.trim();
            
            aBubble.textContent = computedReply;
            
            if (computedReply.includes("forwarded your question to our admin team")) {
                const now = new Date();
                const ts = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0') + ' ' + String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
                
                const escalations = JSON.parse(localStorage.getItem('db_escalations')) || [];
                escalations.push({ timestamp: ts, question: userQuery });
                localStorage.setItem('db_escalations', JSON.stringify(escalations));
                
                refreshAdminTables();
            }

            conversationHistory.push({ role: "assistant", content: computedReply });

        } catch (apiError) {
            console.error("Groq Ingestion Error:", apiError);
            aBubble.innerHTML = `<span style="color: var(--brand-terracotta);">Error syncing network operations pipeline.</span>`;
        }
        
        chatScroller.scrollTop = chatScroller.scrollHeight;
    }

    chatSendBtn.addEventListener('click', handleOutgoingChatMessage);
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleOutgoingChatMessage(); });

    // ==========================================================================
    // 9. GOVERNANCE MANAGEMENT LOG CONTROL DRAWERS
    // ==========================================================================
    const adminPanel = document.getElementById('admin-panel');
    const adminTrigger = document.getElementById('governance-trigger');
    const adminClose = document.getElementById('admin-close');
    const adminTabs = document.querySelectorAll('.admin-tab-toggle');
    const adminViews = document.querySelectorAll('.admin-data-view');

    adminTrigger.addEventListener('click', () => {
        refreshAdminTables();
        adminPanel.classList.add('active');
    });
    adminClose.addEventListener('click', () => adminPanel.classList.remove('active'));

    adminTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            adminTabs.forEach(t => t.classList.remove('active'));
            adminViews.forEach(v => v.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(tab.getAttribute('data-tab')).classList.add('active');
        });
    });

    function refreshAdminTables() {
        const vBody = document.getElementById('admin-volunteers-table-body');
        const qBody = document.getElementById('admin-queries-table-body');
        
        vBody.innerHTML = '';
        qBody.innerHTML = '';
        
        const volunteersList = JSON.parse(localStorage.getItem('db_volunteers'));
        volunteersList.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${item.timestamp}</td><td><strong>${item.name}</strong></td><td>${item.email}</td><td>${item.phone}</td>`;
            vBody.appendChild(row);
        });
        
        const escalationsList = JSON.parse(localStorage.getItem('db_escalations'));
        escalationsList.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${item.timestamp}</td><td><em>${item.question}</em></td>`;
            qBody.appendChild(row);
        });
    }
});