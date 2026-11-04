# srs_tables_data.py
# Contains complete table data for Tables 0 to 49 for FocusFlow SRS

TABLES_DATA = {}

# T00: Cover Banner (1 row x 2 cols)
# Col 0 is blank/logo, Col 1 has title info
TABLES_DATA[0] = [
    [
        [("", False)],
        [
            ("Software Requirements Specification\n", True),
            ("for\n", False),
            ("FocusFlow\n", True),
            ("A Context-Aware & Adaptive Ergonomic Interface with Persuasive Feedback, Procedural Soundscapes, and Universal Accessibility\n", False),
            ("Version 1.0\n", True),
            ("Prepared by", True)
        ]
    ]
]

# T01: Metadata Table (10 rows x 2 cols)
TABLES_DATA[1] = [
    [[("Student:", True)], [("Ahmer Khan Niazi", False)]],
    [[("Registration No.:", True)], [("IU 65921", False)]],
    [[("Program:", True)], [("Software Engineering, Batch 2023–2027", False)]],
    [[("Department:", True)], [("Department of Software Engineering, Iqra University", False)]],
    [[("Supervisor:", True)], [("Dr. Rizwan Munir, Assistant Professor (CS)", False)]],
    [[("Project Type:", True)], [("Individual semester project / FYP Prototype (HCI Topics 6 & 10)", False)]],
    [[("Domain:", True)], [("Human-Computer Interaction (HCI), Context-Aware Computing, Persuasive Technology, Universal Accessibility (WCAG AAA), Procedural Audio Synthesis", False)]],
    [[("Standard Followed:", True)], [("IEEE Std 830-1998 structure, extended with elements of ISO/IEC/IEEE 29148 & W3C WCAG 2.1 AAA", False)]],
    [[("Status:", True)], [("Complete Implementation & Production-Ready Prototype", False)]],
    [[("Date:", True)], [("November 2026, Karachi, Pakistan", False)]]
]

# T02: Revision History (2 rows x 4 cols)
TABLES_DATA[2] = [
    [[("Version", True)], [("Date", True)], [("Author", True)], [("Description", True)]],
    [[("1.0", False)], [("November 2026", False)], [("Ahmer Khan Niazi", False)], [("Complete Software Requirements Specification for FocusFlow HCI System", False)]]
]

# T03: Review and Approval (3 rows x 4 cols)
TABLES_DATA[3] = [
    [[("Role", True)], [("Name", True)], [("Signature", True)], [("Date", True)]],
    [[("Prepared by", False)], [("Ahmer Khan Niazi (IU Reg. No. 65921)", False)], [("", False)], [("", False)]],
    [[("Reviewed by (Supervisor)", False)], [("Dr. Rizwan Munir, Assistant Professor (CS)", False)], [("", False)], [("", False)]]
]

# T04: Project Objectives (5 rows x 2 cols)
TABLES_DATA[4] = [
    [[("ID", True)], [("Objective", True)]],
    [[("O1", True)], [("Implement circadian context-awareness that dynamically adapts interface luminance, chromatic temperature, and layout density according to 24-hour solar biological rhythms to mitigate ocular strain.", False)]],
    [[("O2", True)], [("Integrate persuasive gamification, BJ Fogg behavioral nudges, and loss-aversion streak mechanics to boost user deep-work retention and combat digital procrastination.", False)]],
    [[("O3", True)], [("Develop zero-asset procedural acoustic soundscapes (Rain, 40Hz Gamma Binaural Beats, White Noise, Ocean Waves) via real-time Web Audio API mathematical synthesis to mask cognitive distractions.", False)]],
    [[("O4", True)], [("Achieve universal accessibility compliance through W3C Web Speech API two-way voice control, WCAG 2.1 AAA high-contrast modes, and dynamic font-scaling architecture for motor and visually impaired inclusion.", False)]]
]

# T05: Definitions, Acronyms and Abbreviations (12 rows x 2 cols)
TABLES_DATA[5] = [
    [[("Term", True)], [("Definition", True)]],
    [[("HCI", True)], [("Human-Computer Interaction; the interdisciplinary field focused on the design, evaluation, and implementation of interactive computing systems for human use.", False)]],
    [[("Context-Aware Computing", True)], [("A computing paradigm where the system senses and automatically adapts its behavior and user interface to environmental, temporal, or situational factors (Dey & Abowd).", False)]],
    [[("Circadian Rhythm", True)], [("Endogenous biological 24-hour oscillation governing alertness, cognitive fatigue, and melatonin secretion influenced by ambient spectral light (van Bommel).", False)]],
    [[("CLT (Cognitive Load Theory)", True)], [("Psychological framework (Sweller) distinguishing intrinsic, germane, and extraneous mental load; operationalized to eliminate visual distractions during deep focus.", False)]],
    [[("FBM (Fogg Behavior Model)", True)], [("Behavioral formula (B = MAP) stating that human action occurs when Motivation, Ability, and an actionable Prompt converge simultaneously.", False)]],
    [[("Loss Aversion", True)], [("Cognitive bias (Kahneman & Tversky) wherein users exert greater effort to prevent losing an existing streak than to gain an equivalent reward.", False)]],
    [[("Web Audio API", True)], [("High-performance W3C standard JavaScript API for real-time digital signal processing, procedural oscillator graph synthesis, and audio filtering directly in the browser.", False)]],
    [[("Web Speech API", True)], [("W3C browser interface providing speech recognition (STT) and text-to-speech synthesis (TTS) directly on client hardware without external cloud APIs.", False)]],
    [[("WCAG 2.1 Level AAA", True)], [("Web Content Accessibility Guidelines highest compliance standard requiring a minimum 7:1 text-to-background contrast ratio and switch-access keyboard navigation.", False)]],
    [[("PWA (Progressive Web App)", True)], [("Modern web application architecture combining Service Workers (sw.js) and Web App Manifests to enable offline execution and standalone desktop/mobile installation.", False)]],
    [[("Telemetry", True)], [("Client-side real-time event streaming and analytical logging recording cognitive fatigue metrics, state transitions, and interaction latencies for evaluation.", False)]]
]

# T06: User Classes and Stakeholders (5 rows x 3 cols)
TABLES_DATA[6] = [
    [[("User class", True)], [("Description", True)], [("Technical skill", True)]],
    [[("University Student / Researcher", True)], [("Academic learners and researchers conducting intensive multi-hour study sessions; susceptible to eye fatigue, mental burnout, and digital procrastination.", False)], [("Low to Moderate", False)]],
    [[("Neurodivergent Individual", True)], [("Users with ADHD or sensory sensitivities requiring low-distraction visual clutter, procedural auditory masking, and structured restorative pacing.", False)], [("Low to Moderate", False)]],
    [[("Motor-Impaired Operator", True)], [("Individuals unable to operate standard mouse/keyboard input devices; rely on hands-free speech recognition and accessible switch navigation.", False)], [("Low", False)]],
    [[("HCI Evaluator / Faculty Member", True)], [("Academic instructors, supervisors, and researchers evaluating behavioral telemetry, circadian state logic, and 60x simulation time acceleration.", False)], [("High", False)]]
]

# T07: Scope Boundaries (8 rows x 2 cols)
TABLES_DATA[7] = [
    [[("In scope (core)", True)], [("Optional / out of scope", True)]],
    [[("Zero-dependency client-side architecture (HTML5, CSS3, Vanilla JS ES6+)", False)], [("Centralized cloud databases or backend servers (No Firebase, MongoDB, Node.js)", False)]],
    [[("Circadian context-aware engine (solar clock & automated themes)", False)], [("User accounts, authentication, or social logins (No OAuth, JWT, PII storage)", False)]],
    [[("Persuasive 25/5 Pomodoro timer with SVG circular countdown geometry", False)], [("Pre-recorded audio file streaming or hosting (No static MP3/WAV assets, No Spotify)", False)]],
    [[("Gamified daily streaks, flame tier progression & loss-aversion nudges", False)], [("Heavy build frameworks or bundlers (No React, Angular, Vue, Webpack, npm)", False)]],
    [[("Procedural Web Audio soundscapes (Rain, 40Hz Gamma, White Noise, Ocean Waves)", False)], [("Native app store packaging or proprietary binaries (No Swift, Kotlin, Play Store)", False)]],
    [[("Two-way Web Speech API voice control (STT command parsing & TTS feedback)", False)], [("External wearable biometric hardware (No physical EEG, smartwatch, lux meters)", False)]],
    [[("WCAG 2.1 AAA high-contrast mode, font scaling, and PWA offline Service Worker", False)], [("Paid 3rd-party cloud speech services (No Google Cloud Speech, AWS Polly, Whisper)", False)]]
]

# T08: FR Table 1 - Circadian Context Adaptation (6 rows x 3 cols)
TABLES_DATA[8] = [
    [[("ID", True)], [("Requirement", True)], [("Priority", True)]],
    [[("FR-1", True)], [("The system shall compute real-time solar elevation and determine circadian phases (Dawn, Day, Dusk, Night) based on the client system clock.", False)], [("M", False)]],
    [[("FR-2", True)], [("The system shall dynamically transition CSS custom properties for ambient illumination, chromatic temperature, and blue-light emission according to circadian phase.", False)], [("M", False)]],
    [[("FR-3", True)], [("The system shall provide a manual circadian phase override control allowing immediate switching between Dawn, Day, Dusk, and Night themes.", False)], [("M", False)]],
    [[("FR-4", True)], [("The system shall detect and respect OS media queries including 'prefers-color-scheme' and 'prefers-reduced-motion'.", False)], [("M", False)]],
    [[("FR-5", True)], [("The system shall display live context telemetry indicating current solar angle, active biological phase, and blue-light suppression level.", False)], [("S", False)]]
]

# T09: FR Table 2 - Persuasive Focus Timer (7 rows x 3 cols)
TABLES_DATA[9] = [
    [[("ID", True)], [("Requirement", True)], [("Priority", True)]],
    [[("FR-6", True)], [("The system shall provide a precision countdown timer supporting 25-minute deep work intervals, 5-minute short breaks, and 15-minute long breaks.", False)], [("M", False)]],
    [[("FR-7", True)], [("The system shall visually render remaining time using an animated SVG circular progress ring calculated via mathematical stroke-dashoffset interpolation.", False)], [("M", False)]],
    [[("FR-8", True)], [("The system shall support Start, Pause, Resume, and Reset operations through click, keyboard shortcut, and voice command.", False)], [("M", False)]],
    [[("FR-9", True)], [("The system shall trigger a procedurally synthesized completion chime via the Web Audio API upon timer termination.", False)], [("M", False)]],
    [[("FR-10", True)], [("The system shall persist timer state and elapsed duration in browser localStorage to survive unintended page refreshes.", False)], [("S", False)]],
    [[("FR-11", True)], [("The system shall track and visually display completed focus cycles and total daily productive minutes.", False)], [("M", False)]]
]

# T10: FR Table 3 - Gamification and Streak Mechanics (6 rows x 3 cols)
TABLES_DATA[10] = [
    [[("ID", True)], [("Requirement", True)], [("Priority", True)]],
    [[("FR-12", True)], [("The system shall maintain a consecutive daily streak counter incremented automatically upon completing minimum daily deep work thresholds.", False)], [("M", False)]],
    [[("FR-13", True)], [("The system shall award gamified tier badges (Novice, Bronze, Silver, Gold, Platinum) based on cumulative focus achievements.", False)], [("M", False)]],
    [[("FR-14", True)], [("The system shall display a loss-aversion streak preservation warning when a user is at risk of forfeiting hard-earned streak progress.", False)], [("M", False)]],
    [[("FR-15", True)], [("The system shall trigger celebratory procedural visual particle animations upon achieving major streak milestones.", False)], [("S", False)]],
    [[("FR-16", True)], [("The system shall record all streak updates and gamification state transitions in persistent client storage.", False)], [("M", False)]]
]

# T11: FR Table 4 - Cognitive Rest & Nudge Engine (6 rows x 3 cols)
TABLES_DATA[11] = [
    [[("ID", True)], [("Requirement", True)], [("Priority", True)]],
    [[("FR-17", True)], [("The system shall automatically present a cognitive rest modal dialog immediately following the completion of each focus session.", False)], [("M", False)]],
    [[("FR-18", True)], [("The system shall deliver persuasive behavioral prompts emphasizing the scientifically verified +20% memory retention boost of structured rest.", False)], [("M", False)]],
    [[("FR-19", True)], [("The system shall present randomized micro-break ergonomic recommendations (20-20-20 ocular rule, hydration, physical stretch).", False)], [("M", False)]],
    [[("FR-20", True)], [("The system shall allow users to either accept the suggested restorative break or consciously extend their focus period.", False)], [("M", False)]],
    [[("FR-21", True)], [("The system shall log nudge compliance rates and user responses to quantify behavioral intervention efficacy.", False)], [("S", False)]]
]

# T12: FR Table 5 - Procedural Acoustic Soundscapes (5 rows x 3 cols)
TABLES_DATA[12] = [
    [[("ID", True)], [("Requirement", True)], [("Priority", True)]],
    [[("FR-22", True)], [("The system shall synthesize procedural acoustic soundscapes in real time via Web Audio API without fetching external audio files.", False)], [("M", False)]],
    [[("FR-23", True)], [("The system shall provide a Procedural Rain soundscape using dual white noise buffers routed through low-pass resonant biquad filters.", False)], [("M", False)]],
    [[("FR-24", True)], [("The system shall provide a Binaural Gamma 40Hz soundscape using stereo-panned sine oscillators generating a 40Hz cognitive entrainment differential.", False)], [("M", False)]],
    [[("FR-25", True)], [("The system shall provide White/Brown Noise and Ocean Waves soundscapes utilizing slow low-frequency oscillators (LFO) for natural tidal swells.", False)], [("M", False)]]
]

# T13: FR Table 6 - Two-Way Voice Recognition & Speech Synthesis (5 rows x 3 cols)
TABLES_DATA[13] = [
    [[("ID", True)], [("Requirement", True)], [("Priority", True)]],
    [[("FR-26", True)], [("The system shall capture continuous microphone speech input via W3C SpeechRecognition to recognize navigation and timer commands.", False)], [("M", False)]],
    [[("FR-27", True)], [("The system shall execute parsed vocal intents for 'Start', 'Pause', 'Reset', 'Theme Dawn/Day/Dusk/Night', and 'Soundscape Rain/Waves/Gamma/Off'.", False)], [("M", False)]],
    [[("FR-28", True)], [("The system shall provide real-time spoken vocal feedback via W3C SpeechSynthesis confirming executed commands and timer milestones.", False)], [("M", False)]],
    [[("FR-29", True)], [("The system shall provide a visual microphone status indicator reflecting listening, processing, and standby states.", False)], [("M", False)]]
]

# T14: FR Table 7 - Universal Accessibility & Assistive Navigation (3 rows x 3 cols)
TABLES_DATA[14] = [
    [[("ID", True)], [("Requirement", True)], [("Priority", True)]],
    [[("FR-30", True)], [("The system shall provide a WCAG 2.1 AAA high-contrast toggle ensuring a minimum contrast ratio of 7:1 across all interactive components.", False)], [("M", False)]],
    [[("FR-31", True)], [("The system shall provide dynamic font scaling options (100%, 125%, 150%) preserving full responsiveness without text truncation.", False)], [("M", False)]]
]

# T15: FR Table 8 - HCI Inspector & Live Telemetry Logging (8 rows x 3 cols)
TABLES_DATA[15] = [
    [[("ID", True)], [("Requirement", True)], [("Priority", True)]],
    [[("FR-32", True)], [("The system shall support complete keyboard switch navigation with prominent focus rings, ARIA landmark roles, and live screen-reader announcements.", False)], [("M", False)]],
    [[("FR-33", True)], [("The system shall feature an expandable slide-over HCI Inspector drawer exposing underlying theoretical mechanisms to evaluators.", False)], [("M", False)]],
    [[("FR-34", True)], [("The system shall provide a 60x simulation time acceleration mode to rapidly demonstrate 25-minute Pomodoro cycles within 25 seconds.", False)], [("M", False)]],
    [[("FR-35", True)], [("The system shall stream real-time telemetry logs capturing state changes, circadian adjustments, audio frequencies, and user interactions.", False)], [("M", False)]],
    [[("FR-36", True)], [("The system shall provide interactive circadian and fatigue overrides allowing manual testing of interface adaptations.", False)], [("M", False)]],
    [[("FR-37", True)], [("The system shall inspect and display real-time Web Audio node parameters including gain levels and oscillator frequencies.", False)], [("S", False)]],
    [[("FR-38", True)], [("The system shall allow exporting captured telemetry events as formatted JSON files for academic HCI empirical analysis.", False)], [("S", False)]]
]

# T16: FR Table 9 - PWA Offline Caching & Execution (3 rows x 3 cols)
TABLES_DATA[16] = [
    [[("ID", True)], [("Requirement", True)], [("Priority", True)]],
    [[("FR-39", True)], [("The system shall display a platform capabilities matrix confirming browser support for Web Audio, Web Speech, and Service Worker APIs.", False)], [("M", False)]],
    [[("FR-40", True)], [("The system shall employ a dedicated Service Worker (sw.js) implementing a cache-first strategy for zero-latency 100% offline functionality.", False)], [("M", False)]]
]

# T17: NFR Table 1 - Performance (5 rows x 4 cols)
TABLES_DATA[17] = [
    [[("ID", True)], [("Requirement", True)], [("Target", True)], [("Verification", True)]],
    [[("NFR-1", True)], [("First Contentful Paint (FCP) and initial load latency", False)], [("≤ 800 ms on standard 4G / broadband", False)], [("Google Lighthouse performance audit", False)]],
    [[("NFR-2", True)], [("Audio synthesis initiation latency", False)], [("≤ 50 ms from trigger to first acoustic sample", False)], [("Web Audio AudioContext timestamp audit", False)]],
    [[("NFR-3", True)], [("Interface animation frame rate (SVG timer and theme transitions)", False)], [("Solid 60 frames per second (zero dropped frames)", False)], [("Chrome DevTools Performance Profiler", False)]],
    [[("NFR-4", True)], [("Total application asset payload (HTML + CSS + Vanilla JS)", False)], [("≤ 150 KB uncompressed (zero external libraries)", False)], [("Network tab transfer size inspection", False)]]
]

# T18: NFR Table 2 - Security (7 rows x 3 cols)
TABLES_DATA[18] = [
    [[("ID", True)], [("Requirement", True)], [("Verification", True)]],
    [[("NFR-5", True)], [("Strict Content Security Policy (CSP) forbidding unsafe-eval and unauthorized CDNs", False)], [("Browser security console inspection & header audit", False)]],
    [[("NFR-6", True)], [("All application traffic served over HTTPS (TLS 1.3) via GitHub Pages CDN", False)], [("SSL certificate verification", False)]],
    [[("NFR-7", True)], [("Zero transmission of user interaction telemetry to external third-party servers", False)], [("DevTools Network tab zero outgoing request verification", False)]],
    [[("NFR-8", True)], [("Microphone stream explicitly deactivated immediately after vocal command processing", False)], [("MediaStreamTrack.stop() lifecycle test", False)]],
    [[("NFR-9", True)], [("No sensitive credentials, API keys, or private tokens stored in client-side code", False)], [("Source code security review", False)]],
    [[("NFR-10", True)], [("Sanitization of all rendered string inputs to prevent Cross-Site Scripting (XSS)", False)], [("DOM injection unit test", False)]]
]

# T19: NFR Table 3 - Privacy & Responsible Data Handling (5 rows x 3 cols)
TABLES_DATA[19] = [
    [[("ID", True)], [("Requirement", True)], [("Verification", True)]],
    [[("NFR-11", True)], [("Zero collection or retention of Personally Identifiable Information (PII)", False)], [("Privacy compliance audit", False)]],
    [[("NFR-12", True)], [("Microphone access requested solely on explicit user toggle; never active in background", False)], [("Browser permission workflow verification", False)]],
    [[("NFR-13", True)], [("User focus statistics and streaks stored exclusively within client browser localStorage", False)], [("Storage inspector review", False)]],
    [[("NFR-14", True)], [("One-click user data reset functionality instantly purging all local storage state", False)], [("Reset data button functional test", False)]]
]

# T20: NFR Table 4 - Usability & Ergonomics (3 rows x 4 cols)
TABLES_DATA[20] = [
    [[("ID", True)], [("Requirement", True)], [("Target", True)], [("Verification", True)]],
    [[("NFR-15", True)], [("Primary deep-work initiation workflow simplicity", False)], [("≤ 1 interaction (click, keypress, or voice prompt)", False)], [("Cognitive walkthrough assessment", False)]],
    [[("NFR-16", True)], [("System Usability Scale (SUS) score among test participants", False)], [("≥ 85 out of 100 (Grade A usability)", False)], [("Empirical SUS questionnaire evaluation", False)]]
]

# T21: NFR Table 5 - Reliability & Offline Autonomy (5 rows x 3 cols)
TABLES_DATA[21] = [
    [[("ID", True)], [("Requirement", True)], [("Verification", True)]],
    [[("NFR-17", True)], [("100% full application operational availability in disconnected offline flight mode", False)], [("Offline network throttling and disconnect test", False)]],
    [[("NFR-18", True)], [("Graceful degradation when browser lacks Web Speech API or microphone hardware", False)], [("Fallback visual notification inspection", False)]],
    [[("NFR-19", True)], [("Browser AudioContext auto-resume handling upon user initial interaction", False)], [("Audio policy state test", False)]],
    [[("NFR-20", True)], [("Zero critical runtime JavaScript exceptions across continuous 8-hour focus sessions", False)], [("Console error telemetry audit", False)]]
]

# T22: NFR Table 6 - Maintainability, Portability and Standards Compliance (4 rows x 3 cols)
TABLES_DATA[22] = [
    [[("ID", True)], [("Requirement", True)], [("Verification", True)]],
    [[("NFR-21", True)], [("Modular architecture decoupled into 6 isolated ES6 engines with zero cross-leakage", False)], [("Codebase modularity review", False)]],
    [[("NFR-22", True)], [("Cross-browser rendering fidelity across Chrome, Edge, Safari, and Firefox", False)], [("Multi-browser test suite", False)]],
    [[("NFR-23", True)], [("W3C WCAG 2.1 Level AAA accessibility standard compliance across all themes", False)], [("Axe Accessibility Auditor & NVDA screen reader test", False)]]
]

# T23: Data Requirements - Entities (9 rows x 2 cols)
TABLES_DATA[23] = [
    [[("Entity", True)], [("Main attributes (final form in client storage schema)", True)]],
    [[("FocusSession", True)], [("sessionId (UUID), startTime, endTime, targetDuration, completedDuration, mode (focus/break), completedStatus", False)]],
    [[("CircadianState", True)], [("currentPhase (dawn/day/dusk/night), solarAngle, luminanceFactor, colorTempKelvin, blueLightRatio, autoMode", False)]],
    [[("StreakProfile", True)], [("currentStreakDays, maxStreakDays, lastActiveDate, badgeTier, totalMinutesFocused, streakAtRiskFlag", False)]],
    [[("SoundscapeState", True)], [("activeSoundscape (none/rain/gamma/whitenoise/waves), masterGain, filterCutoff, isPlaying", False)]],
    [[("AccessibilityProfile", True)], [("highContrastEnabled, fontScalePercentage (100/125/150), voiceNavActive, ttsFeedbackEnabled, reducedMotion", False)]],
    [[("TelemetryEvent", True)], [("eventId, timestamp, eventCategory, eventAction, cognitiveFatigueScore, solarPhaseAtEvent, durationMs", False)]],
    [[("NudgeInteraction", True)], [("nudgeId, triggerSessionId, promptShown, userDecision (accepted/extended), responseTimeMs", False)]],
    [[("SystemOverride", True)], [("overrideId, targetEngine, overrideValue, injectedTimestamp, simulatedTimeMultiplier (1x/60x)", False)]]
]

# T24: Architecture Components & Responsibilities (7 rows x 3 cols)
TABLES_DATA[24] = [
    [[("Component", True)], [("Technology (implemented)", True)], [("Responsibility", True)]],
    [[("Context Engine", True)], [("contextEngine.js (Vanilla ES6)", False)], [("Calculates solar elevations, detects circadian cycles, dispatches CSS theme tokens, manages light attenuation", False)]],
    [[("Persuasive Engine", True)], [("persuasiveEngine.js (Vanilla ES6)", False)], [("Orchestrates Pomodoro timer, calculates SVG geometry, tracks streaks, issues loss-aversion prompts", False)]],
    [[("Audio Engine", True)], [("audio.js (Web Audio API)", False)], [("Procedural real-time DSP synthesis: Rain, 40Hz Gamma binaural beats, Ocean Waves, and completion chimes", False)]],
    [[("Accessibility Engine", True)], [("accessibilityEngine.js (Web Speech API)", False)], [("Continuous speech recognition, intent parsing, spoken TTS confirmations, WCAG AAA contrast, font scaling", False)]],
    [[("HCI Inspector Drawer", True)], [("hciInspector.js (Vanilla ES6)", False)], [("Research telemetric event streaming, 60x temporal accelerator, theoretical state verification console", False)]],
    [[("Application Controller", True)], [("app.js (Vanilla ES6)", False)], [("Master event coordinator, global keyboard shortcut binder, lifecycle orchestrator, Service Worker registrar", False)]]
]

# T25: Planned Diagrams (12 rows x 4 cols)
TABLES_DATA[25] = [
    [[("No.", True)], [("Diagram", True)], [("Content", True)], [("Week", True)]],
    [[("D-1", False)], [("Context Diagram (Level 0 DFD)", False)], [("FocusFlow and external entities: User, Solar Clock, Audio Output, Microphone, Local Storage", False)], [("3", False)]],
    [[("D-2", False)], [("Modular Architecture Diagram", False)], [("6 decoupled engines, Service Worker, and DOM interaction pathways", False)], [("3", False)]],
    [[("D-3", False)], [("Circadian Phase State Diagram", False)], [("Solar elevation transitions between Dawn, Day, Dusk, and Night with override paths", False)], [("4", False)]],
    [[("D-4", False)], [("Pomodoro Timer State Machine", False)], [("Idle, Active Focus, Paused, Session Complete, Short Break, Long Break states", False)], [("4", False)]],
    [[("D-5", False)], [("Use Case Diagram", False)], [("Primary actors (Student, Neurodivergent User, Motor-impaired, Evaluator) and system use cases", False)], [("5", False)]],
    [[("D-6", False)], [("Web Audio DSP Synthesis Graph", False)], [("AudioContext node graphs: BufferSource, BiquadFilter, GainNodes, StereoPanner, Destination", False)], [("6", False)]],
    [[("D-7", False)], [("Two-Way Speech Recognition Sequence", False)], [("Audio stream -> SpeechRecognition -> Intent Parser -> Action Dispatcher -> SpeechSynthesis TTS", False)], [("7", False)]],
    [[("D-8", False)], [("Persuasive Nudge Flowchart", False)], [("Session End -> Rest Nudge Display -> 20% Retention Prompt -> User Choice evaluation", False)], [("8", False)]],
    [[("D-9", False)], [("Streak Gamification Flow Diagram", False)], [("Daily completion check -> Streak increment -> Badge tier evaluation -> Loss-aversion calculation", False)], [("9", False)]],
    [[("D-10", False)], [("Entity Relationship Diagram (ERD)", False)], [("Logical structure of LocalStorage schemas: Sessions, Streaks, Preferences, Telemetry", False)], [("10", False)]],
    [[("D-11", False)], [("PWA Service Worker Lifecycle", False)], [("Installation -> Cache precaching -> Fetch intercept -> Offline fallback delivery", False)], [("11", False)]]
]

# T26: UI Mockups / Screens (10 rows x 3 cols)
TABLES_DATA[26] = [
    [[("Screen", True)], [("Key elements", True)], [("Requirements", True)]],
    [[("M-1 Circadian Dashboard", True)], [("Dynamic solar status bar, circadian phase badge, blue-light indicator, ambient background", False)], [("FR-1, FR-2, FR-5", False)]],
    [[("M-2 Focus Timer Ring", True)], [("SVG circular progress ring, central digital countdown, Start/Pause/Reset buttons, cycle badges", False)], [("FR-6, FR-7, FR-8, FR-11", False)]],
    [[("M-3 Gamified Streak Banner", True)], [("Current streak count, flame tier icon, loss-aversion warning text, productive minutes counter", False)], [("FR-12, FR-13, FR-14", False)]],
    [[("M-4 Procedural Soundscape Tray", True)], [("Soundscape selector buttons (Rain, Gamma 40Hz, White Noise, Ocean Waves), volume slider", False)], [("FR-22, FR-23, FR-24, FR-25", False)]],
    [[("M-5 Accessibility Modal", True)], [("WCAG AAA high-contrast toggle, font-scaling controls (100/125/150%), voice assist toggle", False)], [("FR-30, FR-31", False)]],
    [[("M-6 Voice Recognition Pill", True)], [("Microphone status indicator (Listening/Processing), live spoken transcript, TTS toggle", False)], [("FR-26, FR-27, FR-28, FR-29", False)]],
    [[("M-7 Cognitive Rest Nudge Modal", True)], [("Break notification, +20% memory retention scientific prompt, 20-20-20 rule, Take Break button", False)], [("FR-17, FR-18, FR-19, FR-20", False)]],
    [[("M-8 HCI Telemetry Inspector", True)], [("Slide-over research drawer, live event stream, 60x speed-up toggle, manual context injectors", False)], [("FR-33, FR-34, FR-35, FR-36", False)]],
    [[("M-9 Keyboard Shortcuts Modal", True)], [("Comprehensive hotkey cheatsheet (Space: Start/Pause, R: Reset, S: Sound, H: High Contrast)", False)], [("FR-32", False)]]
]

# T27 to T33: Use Cases UC-1 to UC-7
# T27: UC-1 Initiate Circadian Focus Session (9 rows x 2 cols)
TABLES_DATA[27] = [
    [[("Field", True)], [("Description", True)]],
    [[("Actor", True)], [("University Student / Knowledge Worker", False)]],
    [[("Goal", True)], [("Initiate a structured 25-minute circadian-aligned deep-work focus session", False)]],
    [[("Preconditions", True)], [("FocusFlow loaded in browser or launched as standalone PWA", False)]],
    [[("Trigger", True)], [("User clicks 'Start Focus' button, presses Spacebar, or speaks 'Start Focus'", False)]],
    [[("Main flow", True)], [("1. Timer transitions from Idle to Active Focus. 2. Solar engine sets circadian ambient theme. 3. SVG ring animates countdown. 4. Active session recorded in telemetry.", False)]],
    [[("Postconditions", True)], [("Focus session actively running; countdown visible; background theme synchronized with circadian phase.", False)]],
    [[("Exceptions", True)], [("User pauses timer before completion; state preserved in localStorage.", False)]],
    [[("Frequency", True)], [("Multiple times daily per user", False)]]
]

# T28: UC-2 Procedural Acoustic Soundscape Synthesis (9 rows x 2 cols)
TABLES_DATA[28] = [
    [[("Field", True)], [("Description", True)]],
    [[("Actor", True)], [("Neurodivergent Individual / Focus Worker", False)]],
    [[("Goal", True)], [("Mask ambient auditory distractions using procedural acoustic soundscapes", False)]],
    [[("Preconditions", True)], [("Audio output device connected; AudioContext initialized upon user interaction", False)]],
    [[("Trigger", True)], [("User selects a soundscape preset (e.g., 'Rain' or '40Hz Gamma') or speaks 'Play Rain'", False)]],
    [[("Main flow", True)], [("1. audio.js activates Web Audio AudioContext. 2. DSP oscillator/noise graph configured in memory. 3. Real-time synthesized sound begins playing with smooth fade-in. 4. Volume adjusted via slider.", False)]],
    [[("Postconditions", True)], [("Acoustic soundscape masks ambient noise; no external MP3 downloaded; node parameters streamed to Inspector.", False)]],
    [[("Exceptions", True)], [("AudioContext blocked by browser policy; user prompted with one-click audio resume button.", False)]],
    [[("Frequency", True)], [("During focus work intervals", False)]]
]

# T29: UC-3 Hands-Free Voice Control Navigation (7 rows x 2 cols)
TABLES_DATA[29] = [
    [[("Field", True)], [("Description", True)]],
    [[("Actor", True)], [("Motor-Impaired Operator / Hands-Free User", False)]],
    [[("Goal", True)], [("Operate core application features entirely through spoken voice commands", False)]],
    [[("Preconditions", True)], [("Microphone connected; browser supports Web Speech API (Chromium / Safari)", False)]],
    [[("Trigger", True)], [("User toggles microphone or speaks command keyword (e.g., 'Start', 'Pause', 'Theme Night')", False)]],
    [[("Main flow", True)], [("1. SpeechRecognition captures speech. 2. Intent parser matches phonemes. 3. Target engine function invoked. 4. SpeechSynthesis speaks auditory confirmation ('Focus timer started').", False)]],
    [[("Postconditions", True)], [("Action executed without physical mouse or keyboard interaction; transcript logged to telemetry.", False)]]
]

# T30: UC-4 Universal Accessibility Adjustment (7 rows x 2 cols)
TABLES_DATA[30] = [
    [[("Field", True)], [("Description", True)]],
    [[("Actor", True)], [("Low-Vision / Motor-Impaired User", False)]],
    [[("Goal", True)], [("Customize visual display to meet cognitive and ergonomic accessibility needs", False)]],
    [[("Preconditions", True)], [("User accesses Accessibility settings modal or uses hotkey (Alt + A / Alt + H)", False)]],
    [[("Trigger", True)], [("User activates 'High Contrast Mode' or selects '150% Font Scaling'", False)]],
    [[("Main flow", True)], [("1. accessibilityEngine.js injects high-contrast CSS overrides ensuring ≥ 7:1 contrast. 2. Root rem font-size updated to 1.5x. 3. Layout recalculates without clipping. 4. Preferences stored in localStorage.", False)]],
    [[("Postconditions", True)], [("Interface rendered in high-contrast or magnified scale; fully compliant with WCAG 2.1 AAA.", False)]]
]

# T31: UC-5 Telemetry Inspection & 60x Fast-Forward Simulation (7 rows x 2 cols)
TABLES_DATA[31] = [
    [[("Field", True)], [("Description", True)]],
    [[("Actor", True)], [("HCI Faculty Supervisor / Academic Evaluator", False)]],
    [[("Goal", True)], [("Verify HCI theoretical behaviors and test long focus cycles rapidly", False)]],
    [[("Preconditions", True)], [("FocusFlow running; evaluator opens HCI Concept Inspector drawer (Alt + I or button)", False)]],
    [[("Trigger", True)], [("Evaluator enables '60x Fast Forward Simulation' toggle", False)]],
    [[("Main flow", True)], [("1. Timer clock multiplier set to 60. 2. 25-minute Pomodoro cycle completes in 25 real-world seconds. 3. Telemetry drawer logs real-time state changes and cognitive fatigue transitions. 4. Rest nudge modal triggered upon completion.", False)]],
    [[("Postconditions", True)], [("Complete 25-minute behavioral cycle verified in under 30 seconds; telemetric integrity validated.", False)]]
]

# T32: UC-6 Progressive Web App (PWA) Offline Installation (6 rows x 2 cols)
TABLES_DATA[32] = [
    [[("Field", True)], [("Description", True)]],
    [[("Actor", True)], [("Any User / Mobile or Desktop Operator", False)]],
    [[("Goal", True)], [("Install FocusFlow as a standalone desktop/mobile app and operate offline", False)]],
    [[("Preconditions", True)], [("Modern browser with Service Worker support visiting live GitHub Pages URL", False)]],
    [[("Trigger", True)], [("User clicks 'Install FocusFlow' banner or browser 'Add to Home Screen' action", False)]],
    [[("Main flow", True)], [("1. Browser prompts PWA installation. 2. Service Worker sw.js caches application shell and assets. 3. Standalone app shortcut created on desktop/mobile homescreen. 4. App launches in standalone window without browser chrome.", False)]]
]

# T33: UC-7 Behavioral Nudge Intervention & Loss-Aversion Acknowledgment (7 rows x 2 cols)
TABLES_DATA[33] = [
    [[("Field", True)], [("Description", True)]],
    [[("Actor", True)], [("University Student completing focus cycle", False)]],
    [[("Goal", True)], [("Reinforce habit formation and cognitive rest through persuasive psychological nudges", False)]],
    [[("Preconditions", True)], [("25-minute deep-work session countdown reaches 00:00", False)]],
    [[("Trigger", True)], [("Persuasive Engine intercepts session termination", False)]],
    [[("Main flow", True)], [("1. Procedural completion gong chimes. 2. Persuasive rest nudge modal presents with scientific memory retention prompt (+20% gain). 3. Rest countdown initiated. 4. Daily streak count incremented and flame badge updated.", False)]],
    [[("Postconditions", True)], [("User incentivized to take restorative cognitive break; streak progress preserved in local storage.", False)]]
]

# T34: Pilot & Evaluative Benchmark Specification (9 rows x 2 cols)
TABLES_DATA[34] = [
    [[("Parameter", True)], [("Specification", True)]],
    [[("Evaluation Environment", True)], [("Controlled Cognitive & Accessibility Ergonomics Lab (Iqra University HCI Lab) and Live Web Pilot Testbed", False)]],
    [[("Participant Demographics", True)], [("N = 30 university students, 5 neurodivergent individuals, 3 motor-impaired participants", False)]],
    [[("Evaluation Protocol", True)], [("Within-subjects comparative study: Standard Digital Timer vs FocusFlow Circadian/Persuasive Interface", False)]],
    [[("Independent Variables", True)], [("Circadian Adaptation (On/Off), Persuasive Nudges (Present/Absent), Procedural Soundscapes (Active/Muted)", False)]],
    [[("Dependent Variables", True)], [("Task completion rate, Self-reported cognitive fatigue (NASA-TLX), Information retention rate, System Usability Scale (SUS)", False)]],
    [[("Evaluation Tools", True)], [("Chrome DevTools Performance Profiler, Axe Accessibility Auditor, Lighthouse, NVDA Screen Reader", False)]],
    [[("Session Duration", True)], [("Controlled 50-minute testing blocks (two 25-minute Pomodoro intervals separated by structured break)", False)]],
    [[("Data Storage", True)], [("Client-side telemetric event stream exported via JSON; zero remote telemetry transmission", False)]]
]

# T35: LocalStorage Schema Code Snippet (1 row x 1 col)
TABLES_DATA[35] = [
    [
        [
            ("// FocusFlow Client-Side Storage & Telemetry Architecture Schema\n", True),
            ("const FocusFlowDataModel = {\n  sessions: [\n    { id: 'f81d4fae-uuid', mode: 'focus', duration: 1500, completed: true, timestamp: 1730736000000 }\n  ],\n  streaks: {\n    current: 7, best: 14, lastDate: '2026-11-04', tier: 'Gold Flame', atRisk: false\n  },\n  settings: {\n    circadianAuto: true, highContrast: false, fontScale: 100, voiceEnabled: true, soundscape: 'rain'\n  },\n  telemetry: [\n    { event: 'SESSION_END', solarPhase: 'Dusk', fatigueScore: 35, timestamp: 1730736000000 }\n  ]\n};", False)
        ]
    ]
]

# T36: Hosting and Development Plan (8 rows x 2 cols)
TABLES_DATA[36] = [
    [[("Item", True)], [("Plan", True)]],
    [[("Source control", True)], [("Git with public GitHub repository (AhmerKhanNiazi/HCI-FOCUS-FLOW); main branch protected", False)]],
    [[("CI/CD Deployment", True)], [("Automated GitHub Actions workflow (.github/workflows/deploy.yml) publishing to GitHub Pages on every push", False)]],
    [[("Primary Hosting", True)], [("GitHub Pages CDN (https://ahmerkhanniazi.github.io/HCI-FOCUS-FLOW/) with global HTTPS edge distribution", False)]],
    [[("Secondary Hosting", True)], [("Vercel Edge Network configured as zero-configuration static deployment mirror", False)]],
    [[("Offline Service Worker", True)], [("sw.js precaching HTML, CSS, JS, manifest, and icons with cache-first routing", False)]],
    [[("Development Environment", True)], [("Visual Studio Code, Live Server, Chrome DevTools, PowerShell terminal on Windows 11", False)]],
    [[("Accessibility Testing", True)], [("Axe DevTools, Lighthouse Accessibility 100/100, NVDA screen reader, Windows Speech Recognition", False)]]
]

# T37: Hosting Options & Fallbacks (7 rows x 3 cols)
TABLES_DATA[37] = [
    [[("Component", True)], [("Option A (preferred if available)", True)], [("Option B (fallback)", True)]],
    [[("Web Hosting", True)], [("GitHub Pages CDN (Free, HTTPS, 99.9% uptime)", False)], [("Vercel Edge Static Hosting", False)]],
    [[("Client Delivery", True)], [("Service Worker CacheFirst (100% offline standalone)", False)], [("Localhost HTTP server (python -m http.server 8000)", False)]],
    [[("Audio Engine", True)], [("Web Audio API mathematical real-time synthesis", False)], [("Synthetic HTML5 audio tone oscillator fallback", False)]],
    [[("Voice Engine", True)], [("W3C SpeechRecognition (Built-in Chromium engine)", False)], [("Visual command clickable button tray", False)]],
    [[("Data Storage", True)], [("W3C localStorage & Cache Storage API", False)], [("In-memory JavaScript runtime data array", False)]],
    [[("Asset Delivery", True)], [("Single-file zero-dependency self-contained architecture", False)], [("CDN mirrored fallback", False)]]
]

# T38: Human Resources (4 rows x 3 cols)
TABLES_DATA[38] = [
    [[("Role", True)], [("Person", True)], [("Responsibility", True)]],
    [[("Lead Developer & HCI Specialist", True)], [("Ahmer Khan Niazi", False)], [("System design, engine architecture, audio synthesis, accessibility engineering, testing", False)]],
    [[("Project Supervisor", True)], [("Dr. Rizwan Munir", False)], [("Academic supervision, methodology validation, milestone reviews, evaluation guidance", False)]],
    [[("Evaluative Test Cohort", True)], [("Iqra University Student Volunteers", False)], [("Usability testing, cognitive load feedback, accessibility walkthroughs", False)]]
]

# T39: Hardware Resources (4 rows x 2 cols)
TABLES_DATA[39] = [
    [[("Item", True)], [("Purpose", True)]],
    [[("Personal Development Laptop", True)], [("Core development, testing, Git management, audio oscillator synthesis tuning", False)]],
    [[("Smartphone (Android & iOS)", True)], [("PWA mobile installation, touch gesture ergonomics, mobile responsive verification", False)]],
    [[("USB Microphone & Headset", True)], [("Web Speech voice recognition testing, binaural 40Hz audio calibration, TTS validation", False)]]
]

# T40: Software and Tools (11 rows x 3 cols)
TABLES_DATA[40] = [
    [[("Category", True)], [("Tool", True)], [("Licence / cost", True)]],
    [[("IDE", True)], [("Visual Studio Code", False)], [("Free / Open Source", False)]],
    [[("Version Control", True)], [("Git & GitHub", False)], [("Free", False)]],
    [[("Web Architecture", True)], [("Semantic HTML5, CSS3 Custom Properties, Vanilla ES6+", False)], [("Free / W3C Open Standard", False)]],
    [[("Styling System", True)], [("Tailwind CSS Runtime", False)], [("Free / MIT", False)]],
    [[("Audio Synthesis", True)], [("W3C Web Audio API", False)], [("Free / Native Browser Standard", False)]],
    [[("Speech Processing", True)], [("W3C Web Speech API", False)], [("Free / Native Browser Standard", False)]],
    [[("Offline PWA", True)], [("Service Worker API & Cache Storage", False)], [("Free / Native Browser Standard", False)]],
    [[("Accessibility Auditing", True)], [("Axe DevTools, Lighthouse, NVDA", False)], [("Free / Open Source", False)]],
    [[("Performance Profiler", True)], [("Chrome DevTools & Edge Diagnostics", False)], [("Free / Built-in", False)]],
    [[("Continuous Integration", True)], [("GitHub Actions", False)], [("Free / Included in GitHub", False)]]
]

# T41: Budget Breakdown (12 rows x 4 cols)
TABLES_DATA[41] = [
    [[("No.", True)], [("Item", True)], [("Basis", True)], [("Estimate (PKR)", True)]],
    [[("1", False)], [("Development Laptop and Test Phone", False)], [("Already owned personal devices", False)], [("0", False)]],
    [[("2", False)], [("Code Editor & IDE (VS Code)", False)], [("Open-source software", False)], [("0", False)]],
    [[("3", False)], [("Version Control & Cloud Repo (GitHub)", False)], [("Free tier public repository", False)], [("0", False)]],
    [[("4", False)], [("Web Audio & Speech Synthesizers", False)], [("Native browser W3C APIs", False)], [("0", False)]],
    [[("5", False)], [("Styling Framework (Tailwind CSS)", False)], [("Free runtime script", False)], [("0", False)]],
    [[("6", False)], [("Global CDN Hosting (GitHub Pages)", False)], [("Free automated deployment", False)], [("0", False)]],
    [[("7", False)], [("Secondary Edge Hosting (Vercel)", False)], [("Free tier deployment", False)], [("0", False)]],
    [[("8", False)], [("Domain & SSL Certificate", False)], [("Provided by github.io (HTTPS included)", False)], [("0", False)]],
    [[("9", False)], [("Accessibility Auditing Tools", False)], [("Lighthouse, Axe, NVDA (Open source)", False)], [("0", False)]],
    [[("10", False)], [("Service Worker Offline Cache", False)], [("Client device storage (Zero server cost)", False)], [("0", False)]],
    [[("11", False)], [("Total Direct Expenditure", True)], [("Zero-cost architecture mandate", True)], [("PKR 0", True)]]
]

# T42: Budget Summary Scenarios (4 rows x 2 cols)
TABLES_DATA[42] = [
    [[("Scenario", True)], [("Estimate (PKR)", True)]],
    [[("Minimum: Core features, free tools, zero-dependency deployment", True)], [("PKR 0 (Free)", False)]],
    [[("Target: Full accessibility, procedural soundscapes, PWA offline caching", True)], [("PKR 0 (Free)", False)]],
    [[("Maximum: Academic deployment and evaluation on GitHub Pages CDN", True)], [("PKR 0 (Free)", False)]]
]

# T43: Effort Estimate (11 rows x 3 cols)
TABLES_DATA[43] = [
    [[("Phase", True)], [("Weeks", True)], [("Effort (hours, about 10–12 per week)", True)]],
    [[("Problem definition, literature review, SRS, ethics approval", False)], [("1–2", False)], [("25", False)]],
    [[("Architectural design, modular decoupling, UI wireframing", False)], [("3–4", False)], [("25", False)]],
    [[("Core responsive UI, glassmorphic themes, Tailwind setup", False)], [("5–6", False)], [("30", False)]],
    [[("Circadian Context Adaptation Engine (solar calculations)", False)], [("7–9", False)], [("35", False)]],
    [[("Persuasive Pomodoro timer, SVG progress ring, gamification", False)], [("10–13", False)], [("45", False)]],
    [[("Psychological nudge engine, 20% retention claim, Midterm demo", False)], [("14–16", False)], [("35", False)]],
    [[("Procedural Web Audio synthesizer (Rain, Gamma, Waves)", False)], [("17–20", False)], [("40", False)]],
    [[("Two-way voice recognition, speech synthesis, WCAG AAA a11y", False)], [("21–25", False)], [("45", False)]],
    [[("HCI Inspector drawer, live telemetry stream, PWA caching", False)], [("26–29", False)], [("35", False)]],
    [[("Heuristic evaluation, final report, viva preparation", False)], [("30–32", False)], [("25", False)]]
]

# T44: Risk Analysis (14 rows x 7 cols)
TABLES_DATA[44] = [
    [[("ID", True)], [("Risk", True)], [("P", True)], [("I", True)], [("Score", True)], [("Rating", True)], [("Mitigation and contingency", True)]],
    [[("R-1", True)], [("Web Speech API browser incompatibility (Firefox lacks native SpeechRecognition)", False)], [("4", False)], [("3", False)], [("12", False)], [("Medium", False)], [("Gracefully fallback to prominent keyboard shortcuts and clickable button controls; display clear capability status.", False)]],
    [[("R-2", True)], [("Web Audio Autoplay policy blocking initial audio synthesis", False)], [("5", False)], [("2", False)], [("10", False)], [("Medium", False)], [("AudioContext initialized or resumed strictly inside an explicit user gesture (click/keypress) event listener.", False)]],
    [[("R-3", True)], [("High contrast mode visual clash with glassmorphic styles", False)], [("3", False)], [("3", False)], [("9", False)], [("Medium", False)], [("Inject dedicated high-contrast CSS overrides that disable translucent blur and enforce solid WCAG AAA contrast.", False)]],
    [[("R-4", True)], [("Service Worker cache stale-while-revalidate discrepancies", False)], [("3", False)], [("3", False)], [("9", False)], [("Medium", False)], [("Implement deterministic cache versioning in sw.js and clear outdated caches in the activate event listener.", False)]],
    [[("R-5", True)], [("Timer drifting due to background tab throttling", False)], [("3", False)], [("3", False)], [("9", False)], [("Medium", False)], [("Calculate remaining time via delta timestamps against Date.now() rather than uncalibrated setInterval ticks.", False)]],
    [[("R-6", True)], [("Voice command false triggers from background ambient chatter", False)], [("3", False)], [("2", False)], [("6", False)], [("Low", False)], [("Enforce explicit intent phonetic matching and require dedicated keyword confirmations before execution.", False)]],
    [[("R-7", True)], [("Mobile viewport layout shift with dynamic address bar", False)], [("4", False)], [("2", False)], [("8", False)], [("Medium", False)], [("Utilize modern CSS dvh (dynamic viewport height) units and responsive flexbox wrappers to prevent clipping.", False)]],
    [[("R-8", True)], [("LocalStorage quota exceeded by excessive telemetry logs", False)], [("2", False)], [("2", False)], [("4", False)], [("Low", False)], [("Implement rolling FIFO telemetry buffer capped at the 100 most recent events with manual export option.", False)]],
    [[("R-9", True)], [("Screen reader focus trapping inside modal dialogues", False)], [("3", False)], [("3", False)], [("9", False)], [("Medium", False)], [("Enforce strict ARIA role='dialog', aria-modal='true', and automated focus trapping with Escape key dismissal.", False)]],
    [[("R-10", True)], [("Font scaling layout breakage at 150% magnification", False)], [("3", False)], [("3", False)], [("9", False)], [("Medium", False)], [("Design all containers with relative rem/em units and auto-wrapping flex-wrap architectures.", False)]],
    [[("R-11", True)], [("Audio node race condition when toggling soundscapes rapidly", False)], [("2", False)], [("4", False)], [("8", False)], [("Medium", False)], [("Capture node references into local execution scopes before scheduling fade-out and termination timers.", False)]],
    [[("R-12", True)], [("Loss aversion messaging inducing user stress or anxiety", False)], [("2", False)], [("3", False)], [("6", False)], [("Low", False)], [("Frame all loss-aversion nudges constructively around personal achievement rather than punitive loss.", False)]],
    [[("R-13", True)], [("Deployment or build failures during academic demonstration", False)], [("1", False)], [("5", False)], [("5", False)], [("Low", False)], [("Pre-cache complete standalone application offline via PWA Service Worker; run local HTTP server fallback.", False)]]
]

# T45: Project Schedule & Traceability (17 rows x 4 cols)
TABLES_DATA[45] = [
    [[("Week", True)], [("Activity", True)], [("Deliverable", True)], [("Requirements", True)]],
    [[("1", False)], [("Problem definition, target audience profiling, literature review of Topics 6 & 10", False)], [("Proposal draft, Literature review summary", False)], [("Sections 1–2", False)]],
    [[("2", False)], [("Scope freeze, requirements elicitation, success criteria definition", False)], [("SRS document, Success criteria matrix", False)], [("Section 3", False)]],
    [[("3", False)], [("Architectural design, modular engine decomposition, wireframing", False)], [("Architecture diagram, UI wireframes", False)], [("Sections 4–5", False)]],
    [[("4", False)], [("Circadian color palette selection, WCAG contrast verification, baseline freeze", False)], [("WCAG color palettes, Design document", False)], [("Section 5", False)]],
    [[("5", False)], [("Core UI implementation, Tailwind CSS setup, glassmorphism stylesheet", False)], [("Base HTML5/CSS3 responsive prototype", False)], [("FR-1, FR-2", False)]],
    [[("6", False)], [("Responsive layout validation across desktop, tablet, and mobile displays", False)], [("Multi-device layout report", False)], [("NFR-3, NFR-22", False)]],
    [[("7", False)], [("Context Adaptation Engine (solar elevation & circadian phase detection)", False)], [("contextEngine.js prototype", False)], [("FR-1, FR-2", False)]],
    [[("8", False)], [("Circadian theme switcher, dynamic CSS token interpolation, manual override", False)], [("Circadian UI transitions", False)], [("FR-3, FR-4, FR-5", False)]],
    [[("9", False)], [("Persuasive Pomodoro timer state machine and interval countdown math", False)], [("persuasiveEngine.js timer core", False)], [("FR-6, FR-8", False)]],
    [[("10", False)], [("SVG circular progress ring mathematics and stroke-dashoffset interpolation", False)], [("Animated SVG countdown ring", False)], [("FR-7", False)]],
    [[("11", False)], [("Gamified streak tracking, badge tier progression, and loss-aversion alerts", False)], [("Interactive streak system", False)], [("FR-12, FR-13, FR-14", False)]],
    [[("12", False)], [("Psychological nudge engine, 20% retention prompt, micro-break recommendations", False)], [("Rest nudge modal dialogue", False)], [("FR-17, FR-18, FR-19", False)]],
    [[("13", False)], [("Integrated context & persuasive prototype; midterm demonstration preparation", False)], [("Midterm project demonstration", False)], [("FR-1 to FR-21", False)]],
    [[("14", False)], [("Web Audio API synthesizer, procedural chime, Tibetan gong, 4 soundscapes", False)], [("audio.js procedural audio engine", False)], [("FR-22 to FR-25", False)]],
    [[("15", False)], [("Universal accessibility engine: voice recognition, TTS, WCAG AAA, font scaling", False)], [("accessibilityEngine.js module", False)], [("FR-26 to FR-32", False)]],
    [[("16", False)], [("HCI Inspector drawer, live telemetry logging, 60x fast-forward, PWA caching, viva", False)], [("Final Project Package & Live Deployment", False)], [("FR-33 to FR-40", False)]]
]

# T46: Open Issues (8 rows x 3 cols)
TABLES_DATA[46] = [
    [[("ID", True)], [("Issue", True)], [("Decided in", True)]],
    [[("OI-1", True)], [("Optimal circadian transition intervals for equatorial vs temperate latitudes", False)], [("Week 4", False)]],
    [[("OI-2", True)], [("Binaural beats carrier frequency calibration for maximum cognitive comfort (160 Hz selected)", False)], [("Week 8", False)]],
    [[("OI-3", True)], [("Phonetic speech command dictionary expansion for diverse regional accents", False)], [("Week 12", False)]],
    [[("OI-4", True)], [("Font scaling container auto-wrap thresholds at 150% zoom", False)], [("Week 15", False)]],
    [[("OI-5", True)], [("Service Worker precaching versioning strategy for instant updates", False)], [("Week 16", False)]],
    [[("OI-6", True)], [("Cross-device streak synchronization via decentralized WebRTC data channels", False)], [("Future Work", False)]],
    [[("OI-7", True)], [("Webcam-based gaze estimation for automatic eye-fatigue detection without cloud upload", False)], [("Future Work", False)]]
]

# T47: Requirements Traceability Matrix (12 rows x 5 cols)
TABLES_DATA[47] = [
    [[("Requirements", True)], [("Objective", True)], [("Design element", True)], [("Verification", True)], [("Week", True)]],
    [[("FR-1 to FR-5", False)], [("O1", False)], [("contextEngine.js, Solar Clock, Circadian Themes", False)], [("Solar calculation & visual theme test", False)], [("7–8", False)]],
    [[("FR-6 to FR-11", False)], [("O2", False)], [("persuasiveEngine.js, SVG Progress Ring, Timer State", False)], [("Countdown precision & localStorage audit", False)], [("9–10", False)]],
    [[("FR-12 to FR-16", False)], [("O2", False)], [("Streak Mechanics, Badge Tier System, Loss Aversion", False)], [("Gamification state & streak preservation test", False)], [("11", False)]],
    [[("FR-17 to FR-21", False)], [("O2", False)], [("Nudge Engine, Rest Modal, 20% Retention Prompt", False)], [("Behavioral prompt trigger & telemetry test", False)], [("12", False)]],
    [[("FR-22 to FR-25", False)], [("O3", False)], [("audio.js, Web Audio DSP Node Graph, 4 Soundscapes", False)], [("DSP spectrum audit & latency verification", False)], [("14", False)]],
    [[("FR-26 to FR-29", False)], [("O4", False)], [("accessibilityEngine.js, Web Speech API (STT/TTS)", False)], [("Voice command intent parsing & speech test", False)], [("15", False)]],
    [[("FR-30 to FR-32", False)], [("O4", False)], [("WCAG AAA Theme, Font Scaling, Keyboard Shortcuts", False)], [("Axe contrast auditor & NVDA screen reader", False)], [("15", False)]],
    [[("FR-33 to FR-38", False)], [("All", False)], [("hciInspector.js, 60x Speed Simulation, Telemetry", False)], [("Inspector drawer functional verification", False)], [("16", False)]],
    [[("FR-39 to FR-40", False)], [("All", False)], [("sw.js, manifest.json, Progressive Web App Core", False)], [("Offline disconnect & Lighthouse PWA test", False)], [("16", False)]],
    [[("NFR-1 to NFR-4", False)], [("All", False)], [("Zero-dependency Vanilla JS architecture", False)], [("Lighthouse Performance (FCP < 800ms)", False)], [("16", False)]],
    [[("NFR-5 to NFR-23", False)], [("All", False)], [("Modular architecture, CSP compliance, LocalStorage", False)], [("Security review, SUS evaluation, W3C audit", False)], [("16", False)]]
]

# T48: Sustainable Development Goals (SDGs) (3 rows x 2 cols)
TABLES_DATA[48] = [
    [[("Goal", True)], [("Contribution", True)]],
    [[("SDG 3: Good health and well-being", True)], [("Supports Target 3.4 by mitigating digital screen fatigue, preventing mental burnout, reducing ocular strain, and preserving circadian sleep health via automated blue-light attenuation.", False)]],
    [[("SDG 4: Quality education", True)], [("Supports Target 4.5 by providing university students and neurodivergent learners with inclusive focus tools that improve deep-work retention by 20% through structured cognitive rest.", False)]]
]

# T49: Complex Computing Problem (CCP) Attributes (8 rows x 2 cols)
TABLES_DATA[49] = [
    [[("Attribute", True)], [("How it applies", True)]],
    [[("Depth of knowledge", True)], [("Requires deep integration of Human-Computer Interaction theories (Dey & Abowd, van Bommel, Sweller, Fogg), digital signal processing (Web Audio API), Speech APIs, and browser rendering lifecycles.", False)]],
    [[("Conflicting requirements", True)], [("Balancing persistent ambient soundscapes against zero external asset payloads; balancing rich interactive visual animations against strict WCAG AAA 7:1 accessibility standards.", False)]],
    [[("Depth of analysis", True)], [("Modeling circadian solar trajectories algorithmically without GPS permissions and formulating procedural DSP audio algorithms without static audio file streaming.", False)]],
    [[("Familiarity of issues", True)], [("Hands-free voice-controlled productivity and real-time circadian interface adaptation are infrequently encountered in conventional static web utilities.", False)]],
    [[("Extent of applicable codes", True)], [("Strict adherence to W3C Web Content Accessibility Guidelines (WCAG 2.1 Level AAA), W3C Web Audio API standards, and W3C Web App Manifest standards.", False)]],
    [[("Stakeholder involvement", True)], [("Addresses diverse user classes including neurodivergent learners with ADHD, operators with motor disabilities, low-vision users, and academic faculty evaluators.", False)]],
    [[("Interdependence", True)], [("The circadian context engine, persuasive timer state machine, Web Audio DSP synthesizer, and accessibility engine operate as interdependent reactive modules.", False)]]
]

print("All 50 tables data populated.")
