document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('#main-nav a');

    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    // Close menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            mainNav.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#main-header')) {
            mobileMenuToggle.classList.remove('active');
            mainNav.classList.remove('active');
        }
    });

    // --- Header Scroll Effect ---
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Animated Stat Counters (Recount on Every Scroll) ---
    const counters = document.querySelectorAll('.stat-counter');
    const speed = 200; // The lower the slower
    const animatedCounters = new Set(); // Track which counters are currently animating

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const statItem = counter.closest('.stat-item');
        
        // Prevent multiple simultaneous animations
        if (animatedCounters.has(counter)) return;
        animatedCounters.add(counter);
        
        // Add animation effect
        if (statItem) statItem.classList.add('animate');
        
        counter.innerText = '0';
        const updateCount = () => {
            const count = +counter.innerText;
            const inc = target / speed;
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target.toLocaleString();
                // Remove animation class after animation completes
                setTimeout(() => {
                    if (statItem) statItem.classList.remove('animate');
                    animatedCounters.delete(counter);
                }, 600);
            }
        };
        updateCount();
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => counterObserver.observe(counter));

    // --- Animate Elements on Scroll ---
    const scrollElements = document.querySelectorAll('.v-timeline-item, .card');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });
    scrollElements.forEach(el => {
        el.classList.add('scroll-on-view');
        scrollObserver.observe(el);
    });

    // --- Enhanced Timeline Interactivity ---
    const timelineItems = document.querySelectorAll('.v-timeline-item');
    const timelineContainer = document.querySelector('.v-timeline-container');
    
    // Scroll reveal effect for timeline
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.3 });
    timelineItems.forEach(item => timelineObserver.observe(item));

    // Interactive highlight on hover
    timelineItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            timelineItems.forEach(i => i.style.opacity = '0.5');
            this.style.opacity = '1';
        });
        item.addEventListener('mouseleave', function() {
            timelineItems.forEach(i => i.style.opacity = '1');
        });
    });

    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        if (timelineContainer) {
            const scrollPosition = window.scrollY;
            const containerRect = timelineContainer.getBoundingClientRect();
            const containerCenter = window.innerHeight / 2;
            
            timelineItems.forEach((item, index) => {
                const itemRect = item.getBoundingClientRect();
                const distance = itemRect.top - containerCenter;
                const opacity = 1 - Math.abs(distance) / (window.innerHeight * 0.8);
                item.style.opacity = Math.max(0.3, opacity);
            });
        }
    });

    // --- Modal Logic ---
    const allModals = document.querySelectorAll('.modal');
    // Open timeline modals
    document.querySelectorAll('[data-modal]').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'block';
        });
    });
    // Open story modal
    document.querySelectorAll('#story-cta-btn, #story-share-btn-main').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('story-modal').style.display = 'block';
        });
    });
    // Close modals
    allModals.forEach(modal => {
        modal.querySelector('.close-button').addEventListener('click', () => {
            modal.style.display = 'none';
        });
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // --- Tabbed Content for Pillars Section ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const targetTab = button.getAttribute('data-tab');
            tabPanes.forEach(pane => {
                if (pane.id === targetTab) {
                    pane.classList.add('active');
                } else {
                    pane.classList.remove('active');
                }
            });
        });
    });

    // --- Filterable Gallery Logic ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // --- Story Form Submission ---
    const storyForm = document.getElementById('story-form');
    storyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for sharing your story! (This is a demo and data was not submitted)');
        document.getElementById('story-modal').style.display = 'none';
        storyForm.reset();
    });

    // --- AI Assistant Chatbot ---
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWidget = document.getElementById('chatbot-widget');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');

    // NP-specific knowledge base
    const npContext = `You are the NP (Ngee Ann Polytechnic) Assistant. You help visitors to the NP Memory Lane website.
Key facts about NP:
- Founded in 1963 by the Ngee Ann Kongsi
- Originally called Ngee Ann College, renamed to Ngee Ann Polytechnic in 1982
- Located in Singapore
- Offers 40+ academic courses
- Has graduated over 200,000 students
- Facilities include: Innovation Hub, Sports Complex, Lien Ying Chow Library, Auditorium, Modern Labs
- Pillars of Excellence: Innovation & Technology, Student Life & Culture, Community Impact
- Website: www.np.edu.sg

Keep responses concise, friendly, and helpful. If asked about NP, provide accurate information from above. For general questions, be helpful but redirect to NP topics when possible.`;

    function addMessageToChat(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user-message' : 'bot-message'}`;
        const p = document.createElement('p');
        p.textContent = message;
        messageDiv.appendChild(p);
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function showTypingIndicator() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message bot-message typing-indicator';
        messageDiv.id = 'typing-indicator';
        const p = document.createElement('p');
        p.innerHTML = '<span></span><span></span><span></span>';
        messageDiv.appendChild(p);
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }

    // Store conversation history for better context
    let conversationHistory = [];

    async function getAIResponse(userMessage) {
        try {
            // Add user message to history
            conversationHistory.push({
                role: 'user',
                content: userMessage
            });

            // Try using the Cohere API (free tier available)
            const cohereResponse = await fetch('https://api.cohere.ai/v1/generate', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer alSxddY8JcLrTZEphYfWty810J4VVoBGg79blMx9', // Users can add API key
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'command-light',
                    prompt: `${npContext}\n\nConversation:\nUser: ${userMessage}\n\nAssistant:`,
                    max_tokens: 100,
                    temperature: 0.8
                })
            }).catch(() => null);

            if (cohereResponse && cohereResponse.ok) {
                const data = await cohereResponse.json();
                if (data.generations && data.generations[0]) {
                    const botResponse = data.generations[0].text.trim();
                    conversationHistory.push({
                        role: 'assistant',
                        content: botResponse
                    });
                    return botResponse;
                }
            }

            // Fallback: Return intelligent contextual response
            const response = getContextualResponse(userMessage);
            conversationHistory.push({
                role: 'assistant',
                content: response
            });
            return response;
        } catch (error) {
            console.log('API call failed, using fallback responses');
            const response = getContextualResponse(userMessage);
            conversationHistory.push({
                role: 'assistant',
                content: response
            });
            return response;
        }
    }

    function getContextualResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        // NP-specific responses
        const responses = {
            'what is ngee ann': 'Ngee Ann Polytechnic (NP) is a premier polytechnic institution in Singapore, founded in 1963. It offers quality education with over 40 academic courses across engineering, business, IT, health sciences, design, and applied fields. With 200,000+ graduates and a thriving campus culture, NP is known for innovation, student excellence, and community impact.',
            'history|founded|1963|ngee ann college|when was|established': 'Ngee Ann Polytechnic was founded in 1963 by the Ngee Ann Kongsi. It started as Ngee Ann College at the Teochew Building on Tank Road and was renamed to Ngee Ann Polytechnic in 1982, marking its evolution into a premier polytechnic institution in Singapore.',
            'when was np founded|1963 founding': 'In 1963, the Ngee Ann Kongsi established Ngee Ann College with a visionary mission to provide quality education. Starting with just over 100 students at the historic Teochew Building on Tank Road, the institution became a beacon of educational excellence, laying the foundation for what would become one of Singapore\'s leading polytechnics.',
            '1982 name change|identity|1982': 'In 1982, a pivotal transformation occurred when Ngee Ann Technical College was officially renamed Ngee Ann Polytechnic. This landmark change reflected the institution\'s expanded curriculum, enhanced facilities, and its critical role in meeting Singapore\'s growing demand for a skilled technical workforce during the nation\'s rapid industrialization.',
            '1988|silver jubilee|25 years': 'In 1988, NP celebrated its silver jubilee with the publication of "The Ngee Ann Story: The First 25 Years (1963–1988)". This comprehensive chronicle documented the institution\'s remarkable journey, key milestones, challenges overcome, and the pioneering spirit of both staff and students who shaped NP\'s early decades.',
            '2000s|expansion|millennium|new millennium': 'The 2000s marked NP\'s transformation into a forward-thinking institution. The polytechnic embraced new technologies, launched groundbreaking interdisciplinary programs like the NP-NUS Overseas Colleges initiative, expanded its campus significantly, and strengthened industry partnerships. This era cemented NP\'s reputation for nurturing global-ready graduates prepared for an interconnected world.',
            'alumni|graduate|success|achievement': 'NP has produced over 200,000 accomplished graduates since 1963. Our alumni are leaders and innovators across diverse industries globally—from tech pioneers founding startups, to finance professionals managing billions, to engineers designing infrastructure, to healthcare leaders saving lives. Many attribute their success to the practical skills and mentorship they received at NP.',
            'notable alumni|success stories|famous alumni': 'Many NP alumni have achieved remarkable success. Graduates have gone on to found successful companies in tech, finance, and manufacturing sectors. Others serve as senior managers and executives at multinational corporations including tech giants, banking institutions, and engineering firms. Alumni maintain strong connections through reunions, mentorship programs, and the alumni network.',
            'alumni achievements|alumni work': 'NP alumni work across prestigious organizations globally: Tech sector leaders at companies like Google, Microsoft, and local tech startups. Finance professionals in banking, investment, and insurance sectors. Engineers designing innovative infrastructure and manufacturing solutions. Healthcare professionals and administrators. Entrepreneurs who have founded successful businesses and created employment opportunities.',
            'alumni network|alumni connected|alumni community': 'The NP Alumni Network is a thriving community that keeps graduates connected. Members participate in exclusive alumni events, networking sessions, mentorship programs, and career development workshops. The network facilitates valuable connections between alumni across industries, enabling knowledge sharing and collaborative opportunities that benefit the entire NP community.',
            'where do alumni work|alumni careers|career fields': 'NP graduates work across all major industries: Technology (software development, cybersecurity, data science), Finance & Banking (investment management, financial analysis), Engineering (civil, mechanical, electrical), Healthcare & Wellness, Business & Management, Design & Creative Industries, and Public Service. Many hold senior and executive positions globally.',
            'course|program|diploma|major|subject|what courses|what programs|study': 'NP offers over 40 academic courses across various disciplines including Engineering, Business, Information Technology, Health & Social Sciences, Design, and Applied Science. Each program is designed to prepare students for real-world career success with practical learning experiences.',
            'engineering|engineering courses': 'NP\'s Engineering programs include Civil Engineering, Mechanical Engineering, Electrical Engineering, Chemical Engineering, and Biomedical Engineering. Students gain hands-on experience in state-of-the-art labs, collaborate on real-world projects, and work with industry partners to develop practical skills highly sought by employers.',
            'business|business courses': 'NP\'s Business programs encompass Accountancy, Business Management, Finance, Human Resource Management, and Marketing. These courses blend theoretical knowledge with practical application through case studies, internships, and industry partnerships, preparing graduates for dynamic careers in the business world.',
            'information technology|it courses|tech|programming': 'NP\'s IT programs include Software Engineering, Information Technology, Cybersecurity, and Data Analytics. Students learn cutting-edge programming languages, cloud technologies, and cybersecurity practices while working on real projects. Our curriculum is regularly updated to align with industry demands.',
            'health|science|health courses': 'NP\'s Health and Applied Science programs include Nursing, Pharmaceutical Science, Biomedical Science, and Health & Wellness Management. These programs emphasize practical clinical skills, research methodology, and patient-centered care, preparing graduates to excel in healthcare and life sciences sectors.',
            'facility|campus|building|infrastructure|what facilities|what\'s on campus': 'NP features state-of-the-art facilities including: Innovation Hub with modern labs, Sports Complex, Lien Ying Chow Library, Professional Auditorium, contemporary learning spaces, and technology-equipped classrooms. Our campus is designed to support both academic and student life.',
            'innovation hub|innovation': 'The Innovation Hub at NP is equipped with modern labs and cutting-edge technology for hands-on learning and research projects. Students engage with industry-standard equipment, work on interdisciplinary projects, and collaborate with industry partners to develop practical skills for the future workforce and solve real-world problems.',
            'sports complex|sports|fitness|recreation': 'NP\'s Sports Complex offers excellent facilities for various sports and recreational activities including basketball, volleyball, badminton, swimming, squash, and fitness. The complex hosts both training and competitive events, supporting NP\'s vibrant sports culture and student wellness initiatives.',
            'library|lien ying chow': 'The Lien Ying Chow Library is a heritage wing at NP serving as a sanctuary of knowledge and hub of student life. It houses extensive collections, provides modern learning spaces, hosts academic events, and offers research support. Contact: library@np.edu.sg or call +65 6460 6622.',
            'learning spaces|classrooms|study|where to study': 'NP provides diverse modern learning spaces including collaborative studios, quiet study zones, multimedia labs, maker spaces, and outdoor learning areas. These spaces are designed to support various learning styles and encourage student interaction, innovation, and academic success.',
            'student|life|cca|club|activity|activities|culture': 'Student life at NP is vibrant and dynamic! With numerous Co-Curricular Activities (CCAs) spanning sports, arts, music, technology, and special interest groups, students develop leadership skills and form lifelong friendships while pursuing their academic goals.',
            'cca|clubs|what cca': 'NP offers diverse CCAs including sports teams (football, basketball, badminton), cultural groups (dance, music, traditional arts), technical clubs (robotics, gaming), and interest-based groups. These activities develop character, teamwork, and leadership while creating lasting friendships and campus memories.',
            'campus events|events|festival': 'NP hosts vibrant campus events throughout the year including Orientation Week, Sports Day, Cultural Festival, Graduation Ceremony, Open House, and academic symposiums. These events celebrate NP\'s community spirit, showcase student talents, and strengthen the bonds between students, staff, and alumni.',
            'student friendships|community|belong': 'The NP community fosters genuine friendships and belonging. Students bond through CCAs, group projects, residential programs, and social activities. Many graduates cite their NP friendships as among their most treasured memories, creating networks that last decades beyond graduation.',
            'contact|website|email|phone|address|call|reach': 'For more information about NP:\n📞 Phone: +65 6460 6622\n📧 Email: library@np.edu.sg\n🌐 Website: www.np.edu.sg\n📍 Location: 535 Clementi Road, Singapore 599489\nLibrary Portal: www.np.edu.sg/library',
            'pillar|excellence|value|mission|core values': 'Our three Pillars of Excellence are: (1) Innovation & Technology - pioneering education through cutting-edge learning and tech integration, (2) Student Life & Culture - fostering holistic development and community, and (3) Community Impact - giving back to society through meaningful service and partnerships.',
            'timeline|milestone|year|1982|1988|2000|when did': 'NP\'s timeline includes: 1963 - Foundation as Ngee Ann College, 1982 - Renamed to Ngee Ann Polytechnic, 1988 - Silver jubilee published "The Ngee Ann Story", 2000s - Rapid expansion with new programs and modern facilities. Explore these milestones in our Interactive Timeline section!',
            'memory|story|share|memorable': 'We love hearing from our community! You can share your NP memories and stories using the "Share Your NP Memory" button. Your stories help us celebrate the legacy and impact NP has made on students, staff, and the community over the decades.',
            'admission|apply|enrollment|entry|enrol|join': 'For admission inquiries, please visit www.np.edu.sg for application details, entry requirements, and enrollment procedures. NP welcomes students from diverse backgrounds to join our vibrant learning community.',
            'scholarship|financial|fee|cost|funding|afford': 'For financial information and scholarship opportunities, please visit www.np.edu.sg or contact the main office at +65 6460 6622. NP offers various funding options to support deserving students.'
        };

        // Check for matching keywords (more flexible matching)
        for (const [keywords, response] of Object.entries(responses)) {
            const keywordList = keywords.split('|');
            if (keywordList.some(keyword => lowerMessage.includes(keyword))) {
                return response;
            }
        }

        // Check if message mentions NP or related terms - provide helpful prompts
        if (lowerMessage.includes('np') || lowerMessage.includes('ngee ann') || lowerMessage.includes('polytechnic')) {
            const suggestions = [
                'I\'d love to help! Are you interested in learning about:\n• NP\'s history and milestones?\n• Our courses and programs?\n• Campus facilities?\n• Student life and activities?\n• VR tours of the campus?\n• Alumni stories?',
                'That\'s a great question! To help you better, are you asking about:\n• Facilities and infrastructure?\n• Academic programs?\n• Campus culture and student life?\n• How to get involved or apply?\n• Our history and achievements?',
                'I\'m here to help! Are you curious about:\n• NP\'s journey since 1963?\n• What makes NP special (our pillars of excellence)?\n• How to visit the campus or take a virtual tour?\n• Student experiences and memories?\n• Career opportunities for graduates?'
            ];
            return suggestions[Math.floor(Math.random() * suggestions.length)];
        }

        // General helpful questions
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return 'Hello! 👋 I\'m the NP Assistant. I can help you with information about Ngee Ann Polytechnic\'s history, courses, facilities, campus life, VR tours, and much more. What would you like to know?';
        }
        if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
            return 'You\'re welcome! Happy to help. Is there anything else you\'d like to know about NP or the Memory Lane experience?';
        }
        if (lowerMessage.includes('how') && (lowerMessage.includes('you') || lowerMessage.includes('doing'))) {
            return 'I\'m functioning perfectly, thanks for asking! I\'m here to help you explore and learn about Ngee Ann Polytechnic. What interests you?';
        }
        if (lowerMessage.includes('what can you do') || (lowerMessage.includes('can') && lowerMessage.includes('help'))) {
            return 'I can help you with:\n✓ NP\'s history and milestones\n✓ Courses and programs\n✓ Campus facilities\n✓ Student life and CCAs\n✓ VR campus tours\n✓ Alumni information\n✓ Contact details\n✓ And answer general questions!\n\nWhat would you like to know?';
        }

        // Default helpful response - suggest NP-related topics
        return 'That\'s an interesting question! I specialize in information about Ngee Ann Polytechnic. Would you like to know about:\n• NP\'s fascinating history?\n• Our courses and programs?\n• Campus facilities and infrastructure?\n• Student life and activities?\n• VR virtual tours?\n• How to contact NP?\n\nJust ask me anything about NP!';
    }

    async function handleChatSubmit() {
        const userMessage = chatbotInput.value.trim();
        if (userMessage === '') return;

        addMessageToChat(userMessage, true);
        chatbotInput.value = '';
        chatbotInput.disabled = true;
        chatbotSend.disabled = true;

        showTypingIndicator();

        try {
            const botResponse = await getAIResponse(userMessage);
            removeTypingIndicator();
            addMessageToChat(botResponse, false);
        } catch (error) {
            removeTypingIndicator();
            addMessageToChat('I encountered an issue processing your request. Please try again.', false);
        } finally {
            chatbotInput.disabled = false;
            chatbotSend.disabled = false;
            chatbotInput.focus();
        }
    }

    // Track if suggested questions have been shown
    let suggestedQuestionsShown = false;

    function showSuggestedQuestions() {
        if (suggestedQuestionsShown) return;
        suggestedQuestionsShown = true;

        const suggestedQuestions = [
            "What is NP's history?",
            "What courses does NP offer?",
            "Tell me about the campus facilities",
            "What are NP's Pillars of Excellence?",
            "How can I take a VR tour?",
            "What is student life like at NP?",
            "How do I contact NP?",
            "Tell me about NP alumni"
        ];

        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'suggested-questions';
        suggestionsDiv.innerHTML = '<p style="font-weight: 600; margin-bottom: 1rem; color: var(--np-blue); text-align: center;">Suggested Questions:</p>';
        
        suggestedQuestions.forEach((question, index) => {
            const button = document.createElement('button');
            button.className = 'suggestion-btn';
            button.textContent = question;
            button.onclick = () => {
                chatbotInput.value = question;
                chatbotInput.focus();
                handleChatSubmit();
                suggestionsDiv.remove();
            };
            suggestionsDiv.appendChild(button);
        });

        chatbotMessages.appendChild(suggestionsDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    chatbotToggle.addEventListener('click', () => {
        chatbotWidget.classList.toggle('collapsed');
        if (!chatbotWidget.classList.contains('collapsed')) {
            showSuggestedQuestions();
            chatbotInput.focus();
        }
    });

    chatbotSend.addEventListener('click', handleChatSubmit);

    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !chatbotSend.disabled) {
            handleChatSubmit();
        }
    });

    // --- Guide Buttons Handler ---
    const guideButtons = document.querySelectorAll('.guide-btn');
    
    // Define topic-specific guide buttons
    const topicGuides = {
        'history': [
            { question: 'When was NP founded?', label: '1963 Founding' },
            { question: 'Tell me about the 1982 name change', label: '1982 Identity' },
            { question: 'What happened in 1988?', label: '1988 Silver Jubilee' },
            { question: 'Tell me about NP in the 2000s', label: '2000s Expansion' },
            { question: 'Back to main topics', label: '← Back' }
        ],
        'alumni': [
            { question: 'Tell me about notable alumni achievements', label: 'Success Stories' },
            { question: 'How many graduates has NP produced?', label: 'Graduate Count' },
            { question: 'Where do NP alumni work?', label: 'Career Fields' },
            { question: 'How can alumni stay connected?', label: 'Alumni Network' },
            { question: 'Back to main topics', label: '← Back' }
        ],
        'courses': [
            { question: 'What engineering courses does NP offer?', label: 'Engineering' },
            { question: 'Tell me about business courses', label: 'Business' },
            { question: 'What IT courses are available?', label: 'Information Tech' },
            { question: 'Tell me about health and science courses', label: 'Health & Science' },
            { question: 'Back to main topics', label: '← Back' }
        ],
        'facilities': [
            { question: 'Tell me about the Innovation Hub', label: 'Innovation Hub' },
            { question: 'What sports facilities does NP have?', label: 'Sports Complex' },
            { question: 'Tell me about the library', label: 'Library' },
            { question: 'What learning spaces are available?', label: 'Learning Spaces' },
            { question: 'Back to main topics', label: '← Back' }
        ],
        'studentlife': [
            { question: 'What are CCAs at NP?', label: 'CCAs & Clubs' },
            { question: 'Tell me about student activities', label: 'Activities' },
            { question: 'What events happen on campus?', label: 'Campus Events' },
            { question: 'How do students form friendships?', label: 'Community' },
            { question: 'Back to main topics', label: '← Back' }
        ]
    };

    function showTopicGuides(topic) {
        const guidButtonsContainer = document.getElementById('chatbot-guide-buttons');
        const guides = topicGuides[topic] || [];
        
        // Clear existing buttons
        guidButtonsContainer.innerHTML = '';
        
        // Create new buttons for the topic
        guides.forEach(guide => {
            const btn = document.createElement('button');
            btn.className = 'guide-btn topic-guide-btn';
            btn.setAttribute('data-question', guide.question);
            btn.textContent = guide.label;
            
            btn.addEventListener('click', () => {
                const question = btn.getAttribute('data-question');
                
                // Check if it's a back button
                if (question === 'Back to main topics') {
                    showMainGuides();
                } else {
                    chatbotInput.value = question;
                    chatbotInput.focus();
                    handleChatSubmit();
                }
            });
            
            guidButtonsContainer.appendChild(btn);
        });
    }

    function showMainGuides() {
        const guidButtonsContainer = document.getElementById('chatbot-guide-buttons');
        
        const mainGuides = [
            { question: 'What is Ngee Ann?', label: 'What is Ngee Ann?' },
            { question: 'Tell me about NP\'s history', label: 'History', topic: 'history' },
            { question: 'What courses does NP offer?', label: 'Courses', topic: 'courses' },
            { question: 'What are NP\'s facilities?', label: 'Facilities', topic: 'facilities' },
            { question: 'Tell me about student life', label: 'Student Life', topic: 'studentlife' },
            { question: 'Tell me about NP alumni', label: 'Alumni', topic: 'alumni' },
            { question: 'How do I contact NP?', label: 'Contact' }
        ];
        
        guidButtonsContainer.innerHTML = '';
        
        mainGuides.forEach(guide => {
            const btn = document.createElement('button');
            btn.className = 'guide-btn';
            btn.setAttribute('data-question', guide.question);
            btn.textContent = guide.label;
            
            btn.addEventListener('click', () => {
                const question = btn.getAttribute('data-question');
                chatbotInput.value = question;
                chatbotInput.focus();
                
                // Show topic guides if this button has a topic
                if (guide.topic) {
                    // Send the message first
                    handleChatSubmit();
                    // Then show topic guides after a short delay
                    setTimeout(() => {
                        showTopicGuides(guide.topic);
                    }, 300);
                } else {
                    handleChatSubmit();
                }
            });
            
            guidButtonsContainer.appendChild(btn);
        });
    }

    // Initialize with main guides on page load
    showMainGuides();

    // Add click handlers for any existing guide buttons (fallback)
    guideButtons.forEach(button => {
        button.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            const topic = this.getAttribute('data-topic');
            
            chatbotInput.value = question;
            chatbotInput.focus();
            
            if (topic) {
                handleChatSubmit();
                setTimeout(() => {
                    showTopicGuides(topic);
                }, 300);
            } else {
                handleChatSubmit();
            }
        });
    });

});