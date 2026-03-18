# BotherMe.co — Complete Service Catalog (50 Services)

## How to use this document

This document serves two purposes:

1. **Claude Code** — Use this as the data source for the `/services` page on the marketing site. Each service maps to a product card. The `keyword` field is what users text to subscribe. The `sample_text` is the actual daily SMS they'll receive.

2. **Twilio** — Use the `keyword` field as the inbound trigger word. When a user texts this keyword to the BotherMe number, it initiates the onboarding flow for that service. The `frequency`, `reply_format`, and `escalation` fields define the messaging logic.

---

## Services JSON

```json
{
  "services": [
    {
      "id": 1,
      "name": "PillPing",
      "keyword": "PILLS",
      "category": "Health & Body",
      "price_monthly": 3,
      "tagline": "Medication adherence, minus the nagging spouse.",
      "description": "Daily reminder to take your medication. Optionally alerts a caregiver after 2 consecutive missed days.",
      "sample_text": "Did you take your meds today? Reply YES or SNOOZE (I'll bug you again in 30 min).",
      "frequency": "1x daily at user-set time",
      "reply_format": "YES | NO | SNOOZE",
      "escalation": "Alerts accountability buddy after 2 consecutive NO/no-reply days",
      "setup_questions": [
        "What medication(s) are you tracking?",
        "What time should I text you?",
        "Optional: who should I alert if you miss 2 days in a row? (phone number or SKIP)"
      ],
      "weekly_report": true,
      "streak_tracking": true,
      "emoji": "💊"
    },
    {
      "id": 2,
      "name": "HydroNudge",
      "keyword": "WATER",
      "category": "Health & Body",
      "price_monthly": 2,
      "tagline": "You're dehydrated and we both know it.",
      "description": "3-4 daily check-ins tracking water intake against an 8-glass goal.",
      "sample_text": "You've logged 4 glasses. 4 more to hit your goal. How many since last check?",
      "frequency": "3-4x daily (morning, midday, afternoon, evening)",
      "reply_format": "Number (glasses since last check)",
      "escalation": "None",
      "setup_questions": [
        "What's your daily glass goal? (Default: 8)",
        "When does your day start?",
        "When does your day end?"
      ],
      "weekly_report": true,
      "streak_tracking": true,
      "emoji": "💧"
    },
    {
      "id": 3,
      "name": "FriendPoke",
      "keyword": "FRIENDS",
      "category": "Relationships",
      "price_monthly": 3,
      "tagline": "Because friendships die in silence.",
      "description": "Nudges you to reach out to important people before relationships go stale. Tracks last-contact dates.",
      "sample_text": "It's been 18 days since you reached out to Sarah. Send her a quick text today? Reply DONE when you do.",
      "frequency": "1x daily (rotates through contact list)",
      "reply_format": "DONE | SKIP",
      "escalation": "None",
      "setup_questions": [
        "List 5-20 people you want to stay connected with (first names).",
        "How many days before a nudge? (Default: 14)",
        "What time should I remind you?"
      ],
      "weekly_report": true,
      "streak_tracking": false,
      "emoji": "👋"
    },
    {
      "id": 4,
      "name": "StepCheck",
      "keyword": "STEPS",
      "category": "Health & Body",
      "price_monthly": 2,
      "tagline": "Your phone counts. We ask. You report.",
      "description": "Morning text asking yesterday's step count. Tracks weekly averages and celebrates milestones.",
      "sample_text": "Good morning! How many steps did you get yesterday? (Check your phone's health app.)",
      "frequency": "1x daily (morning)",
      "reply_format": "Number (step count)",
      "escalation": "None",
      "setup_questions": [
        "What's your daily step goal? (Default: 8000)",
        "What time should I ask?"
      ],
      "weekly_report": true,
      "streak_tracking": true,
      "emoji": "🚶"
    },
    {
      "id": 5,
      "name": "MoodPulse",
      "keyword": "MOOD",
      "category": "Mind & Mood",
      "price_monthly": 4,
      "tagline": "Rate your day. See the pattern.",
      "description": "Daily mood score collection with weekly trend analysis. Flags sustained low periods with gentle resource suggestions.",
      "sample_text": "How are you feeling today? Reply 1-5 (1=rough, 5=great).",
      "frequency": "1x daily (evening)",
      "reply_format": "Number 1-5",
      "escalation": "If 3+ consecutive days at 1-2, sends: 'I've noticed a tough stretch. Here's a resource if you want it: [crisis line]. No pressure. I'm here tomorrow too.'",
      "setup_questions": [
        "What time of day gives you the most honest answer?",
        "Optional: want weekly trend texts? (YES/NO)"
      ],
      "weekly_report": true,
      "streak_tracking": true,
      "emoji": "🧠"
    },
    {
      "id": 6,
      "name": "GratitudeText",
      "keyword": "GRATEFUL",
      "category": "Mind & Mood",
      "price_monthly": 2,
      "tagline": "Name one good thing. Go.",
      "description": "Daily evening prompt for a single gratitude entry. Monthly digest of all entries texted on the 1st.",
      "sample_text": "Name one thing you're grateful for today. (Even a small thing counts.)",
      "frequency": "1x daily (evening)",
      "reply_format": "Free text (any reply logged)",
      "escalation": "None",
      "setup_questions": [
        "What time should I ask?",
        "Want a monthly digest of your entries? (YES/NO)"
      ],
      "weekly_report": false,
      "streak_tracking": true,
      "emoji": "🙏"
    },
    {
      "id": 7,
      "name": "SpendAlert",
      "keyword": "SPENDING",
      "category": "Money & Career",
      "price_monthly": 3,
      "tagline": "You spent HOW much today?",
      "description": "End-of-day spending log. Tracks against a weekly budget with mid-week warnings.",
      "sample_text": "How much did you spend today? (Just the number, no $ sign needed.)",
      "frequency": "1x daily (evening)",
      "reply_format": "Number (dollar amount)",
      "escalation": "Mid-week warning if >70% of budget spent by Wednesday",
      "setup_questions": [
        "What's your weekly discretionary budget?",
        "What time should I check in?",
        "Want mid-week budget warnings? (YES/NO)"
      ],
      "weekly_report": true,
      "streak_tracking": false,
      "emoji": "💸"
    },
    {
      "id": 8,
      "name": "SleepLog",
      "keyword": "SLEEP",
      "category": "Health & Body",
      "price_monthly": 2,
      "tagline": "How many hours? Be honest.",
      "description": "Morning text collecting sleep duration. Weekly trend showing averages and best/worst nights.",
      "sample_text": "How many hours did you sleep last night? (Decimals okay — 6.5 counts.)",
      "frequency": "1x daily (morning)",
      "reply_format": "Number (hours, decimals okay)",
      "escalation": "None",
      "setup_questions": [
        "What time should I ask?",
        "What's your sleep goal? (Default: 7.5 hours)"
      ],
      "weekly_report": true,
      "streak_tracking": true,
      "emoji": "😴"
    },
    {
      "id": 9,
      "name": "ScreenBreak",
      "keyword": "SCREEN",
      "category": "Mind & Mood",
      "price_monthly": 3,
      "tagline": "Step away from the glowing rectangle.",
      "description": "Daily text asking self-reported screen time. Tracks trends, sends Friday challenges.",
      "sample_text": "What was your screen time yesterday? (Check Settings > Screen Time and reply with hours.)",
      "frequency": "1x daily (morning)",
      "reply_format": "Number (hours, decimals okay)",
      "escalation": "None",
      "setup_questions": [
        "What's your screen time goal? (Default: 4 hours)",
        "Want Friday challenges? (YES/NO)"
      ],
      "weekly_report": true,
      "streak_tracking": true,
      "emoji": "📵"
    },
    {
      "id": 10,
      "name": "PlantParent",
      "keyword": "PLANTS",
      "category": "Home & Life",
      "price_monthly": 2,
      "tagline": "Your monstera called. It's thirsty.",
      "description": "Customized watering schedule based on plant species and pot size. Adjusts by season.",
      "sample_text": "Time to water your Monstera and pothos! Reply DONE when watered.",
      "frequency": "Variable (per plant watering schedule)",
      "reply_format": "DONE",
      "escalation": "Second reminder 4 hours later if no reply",
      "setup_questions": [
        "List your plants and their types (e.g., 'Monstera, Snake Plant, Pothos').",
        "Indoor or outdoor?",
        "What's your zip code? (for seasonal adjustments)"
      ],
      "weekly_report": false,
      "streak_tracking": true,
      "emoji": "🪴"
    },
    {
      "id": 11,
      "name": "ReadingStreak",
      "keyword": "READ",
      "category": "Mind & Mood",
      "price_monthly": 2,
      "tagline": "20 minutes. That's one chapter. You can do one chapter.",
      "description": "Daily reading habit tracker with streak counting and monthly estimates.",
      "sample_text": "Did you read for 20 minutes today? Reply YES or NO. Current streak: 12 days 🔥",
      "frequency": "1x daily (evening)",
      "reply_format": "YES | NO",
      "escalation": "None",
      "setup_questions": [
        "How many minutes per day is your reading goal? (Default: 20)",
        "What time should I ask?"
      ],
      "weekly_report": true,
      "streak_tracking": true,
      "emoji": "📚"
    },
    {
      "id": 12,
      "name": "SunscreenReminder",
      "keyword": "SUNSCREEN",
      "category": "Health & Body",
      "price_monthly": 2,
      "tagline": "The sun doesn't care about your plans.",
      "description": "Morning text with local UV index and sunscreen reminder. Tracks compliance.",
      "sample_text": "UV index is 7 (HIGH) in your area today. Did you apply sunscreen? Reply YES.",
      "frequency": "1x daily (morning, skips if UV index <3)",
      "reply_format": "YES | NO",
      "escalation": "None",
      "setup_questions": [
        "What's your zip code?",
        "What time do you usually head outside?"
      ],
      "weekly_report": true,
      "streak_tracking": true,
      "emoji": "☀️"
    },
    {
      "id": 13,
      "name": "FlossCoach",
      "keyword": "FLOSS",
      "category": "Health & Body",
      "price_monthly": 2,
      "tagline": "Your dentist says hi. Also, floss.",
      "description": "Evening flossing reminder with streak tracking and 6-month dentist appointment nudges.",
      "sample_text": "Did you floss tonight? Reply YES or NO. Current streak: 28 days. Don't you dare break it.",
      "frequency": "1x daily (evening)",
      "reply_format": "YES | NO",
      "escalation": "None",
      "setup_questions": [
        "What time do you usually brush your teeth at night?",
        "When was your last dentist appointment? (month/year or SKIP)"
      ],
      "weekly_report": true,
      "streak_tracking": true,
      "emoji": "🦷"
    },
    {
      "id": 14,
      "name": "DadText",
      "keyword": "DADTEXT",
      "category": "Relationships",
      "price_monthly": 3,
      "tagline": "Text your kid. Here's what to say.",
      "description": "Daily prompt for fathers to text their children, with a specific conversation starter each day.",
      "sample_text": "Text your kid today. Here's a conversation starter: 'What's the funniest thing that happened to you this week?'",
      "frequency": "1x daily",
      "reply_format": "DONE | SKIP",
      "escalation": "None",
      "setup_questions": [
        "How many kids? What are their names?",
        "How old are they?",
        "What time should I remind you?"
      ],
      "weekly_report": false,
      "streak_tracking": true,
      "emoji": "👨‍👧"
    },
    {
      "id": 15,
      "name": "BPLog",
      "keyword": "BP",
      "category": "Health & Body",
      "price_monthly": 4,
      "tagline": "Know your numbers. Own your numbers.",
      "description": "Twice-daily blood pressure logging with weekly trends. Optionally emails a PDF to your doctor.",
      "sample_text": "Time for your BP reading. Reply with your numbers (e.g., 128/82).",
      "frequency": "2x daily (morning + evening)",
      "reply_format": "Numbers in format XXX/XX",
      "escalation": "Alerts accountability buddy if readings exceed user-set threshold",
      "setup_questions": [
        "When do you take your morning reading?",
        "When do you take your evening reading?",
        "What's your target range? (e.g., under 130/85)",
        "Optional: doctor's email for weekly PDF reports (or SKIP)"
      ],
      "weekly_report": true,
      "streak_tracking": true,
      "emoji": "❤️‍🩹"
    },
    {
      "id": 16,
      "name": "WeightLog",
      "keyword": "WEIGHT",
      "category": "Health & Body",
      "price_monthly": 2,
      "tagline": "Step on. Reply. Step off. That's it.",
      "description": "Daily morning weigh-in with 7-day rolling average to smooth daily fluctuations.",
      "sample_text": "Good morning! Step on the scale and reply with today's weight.",
      "frequency": "1x daily (morning)",
      "reply_format": "Number (weight in lbs or kg)",
      "escalation": "None",
      "setup_questions": [
        "Pounds or kilograms?",
        "What time do you weigh yourself?",
        "What's your target weight? (or SKIP for no target)"
      ],
      "weekly_report": true,
      "streak_tracking": true,
      "emoji": "⚖️"
    },
    {
      "id": 17,
      "name": "StretchBreak",
      "keyword": "STRETCH",
      "category": "Health & Body",
      "price_monthly": 2,
      "tagline": "Your spine filed a complaint.",
      "description": "3-4 work-hour reminders to stand up and stretch with a different 60-second stretch each time.",
      "sample_text": "Stretch break! Stand up and roll your shoulders 10x forward, 10x backward. Reply DONE.",
      "frequency": "3-4x daily (work hours only)",
      "reply_format": "DONE | SKIP",
      "escalation": "None",
      "setup_questions": [
        "What are your work hours? (e.g., 9am-5pm)",
        "How often? Every 1, 2, or 3 hours?"
      ],
      "weekly_report": true,
      "streak_tracking": false,
      "emoji": "🧘"
    },
    {
      "id": 18,
      "name": "MealPrep",
      "keyword": "MEALPREP",
      "category": "Home & Life",
      "price_monthly": 3,
      "tagline": "What's for dinner? We already decided.",
      "description": "Sunday meal plan + daily recipe delivery. Budget-friendly, simple meals filtered by diet preferences.",
      "sample_text": "Today's dinner: One-pan lemon chicken with roasted veggies. Reply GO for the recipe + shopping list.",
      "frequency": "1x Sunday (weekly plan) + 1x daily (that day's recipe)",
      "reply_format": "GO | SKIP",
      "escalation": "None",
      "setup_questions": [
        "Any dietary restrictions? (vegetarian, gluten-free, etc. or NONE)",
        "Cooking for how many people?",
        "Budget per meal? (LOW / MEDIUM / ANY)",
        "What time should I send tomorrow's recipe?"
      ],
      "weekly_report": false,
      "streak_tracking": false,
      "emoji": "🍳"
    },
    {
      "id": 19,
      "name": "JournalPrompt",
      "keyword": "JOURNAL",
      "category": "Mind & Mood",
      "price_monthly": 2,
      "tagline": "Think. Write. Even just a sentence.",
      "description": "Daily journaling prompt. Replies are stored. Monthly digest available.",
      "sample_text": "Today's prompt: What's one thing you'd do differently about yesterday?",
      "frequency": "1x daily",
      "reply_format": "Free text (any reply logged)",
      "escalation": "None",
      "setup_questions": [
        "Morning or evening prompts?",
        "What time?",
        "Want a monthly digest of your entries? (YES/NO)"
      ],
      "weekly_report": false,
      "streak_tracking": true,
      "emoji": "✍️"
    },
    {
      "id": 20,
      "name": "DebtCoach",
      "keyword": "DEBT",
      "category": "Money & Career",
      "price_monthly": 4,
      "tagline": "Shrink the number. Grow the freedom.",
      "description": "Weekly motivational debt payoff tracker with micro-payment suggestions and milestone celebrations.",
      "sample_text": "You've paid off $847 of your $12,400 debt. That's 6.8%! Can you make a $50 extra payment this week? Reply YES or NO.",
      "frequency": "1x weekly (+ milestone texts)",
      "reply_format": "YES | NO | amount paid",
      "escalation": "None",
      "setup_questions": [
        "What's your total debt amount?",
        "Monthly minimum payment?",
        "What day of the week should I check in?"
      ],
      "weekly_report": true,
      "streak_tracking": false,
      "emoji": "📉"
    },
    {
      "id": 21,
      "name": "SobrietyCounter",
      "keyword": "SOBER",
      "category": "Health & Body",
      "price_monthly": 3,
      "tagline": "One day at a time. We're counting with you.",
      "description": "Daily sober day count with encouragement. Optional mood check-in. Sends crisis resources if distress detected.",
      "sample_text": "Day 47 sober. You are incredible. One day at a time. Reply CHECK-IN to log how you're feeling.",
      "frequency": "1x daily (morning)",
      "reply_format": "CHECK-IN (then free text) | OK",
      "escalation": "If reply contains distress keywords, sends crisis resource text (988 Lifeline)",
      "setup_questions": [
        "What's your sobriety start date?",
        "What time should I text you?",
        "Optional: accountability buddy phone number (or SKIP)"
      ],
      "weekly_report": true,
      "streak_tracking": true,
      "emoji": "💪"
    },
    {
      "id": 22,
      "name": "ParentWin",
      "keyword": "PARENTWIN",
      "category": "Relationships",
      "price_monthly": 2,
      "tagline": "You're doing great. Here's proof.",
      "description": "Daily micro-win prompt for parents. One tiny, specific action to build parenting confidence.",
      "sample_text": "Today's micro-win: Put your phone down for 10 minutes of uninterrupted play with your kid. Reply DONE.",
      "frequency": "1x daily",
      "reply_format": "DONE | SKIP",
      "escalation": "None",
      "setup_questions": [
        "How many kids? Ages?",
        "What time of day works best for a parenting nudge?"
      ],
      "weekly_report": false,
      "streak_tracking": true,
      "emoji": "🏆"
    },
    {
      "id": 23,
      "name": "VocabDrip",
      "keyword": "VOCAB",
      "category": "Mind & Mood",
      "price_monthly": 3,
      "tagline": "One word a day. Fluency by stealth.",
      "description": "Daily vocabulary word in target language with definition, example, and weekly quiz.",
      "sample_text": "Today's Spanish word: madrugada (noun) — the early hours before dawn. 'Salimos en la madrugada.' Use it today!",
      "frequency": "1x daily + 1x weekly quiz",
      "reply_format": "Free text (sentence using the word) | SKIP",
      "escalation": "None",
      "setup_questions": [
        "What language are you learning?",
        "Beginner, intermediate, or advanced?",
        "What time should I send your daily word?"
      ],
      "weekly_report": true,
      "streak_tracking": true,
      "emoji": "🗣️"
    },
    {
      "id": 24,
      "name": "ApplyOne",
      "keyword": "JOBHUNT",
      "category": "Money & Career",
      "price_monthly": 4,
      "tagline": "One application a day keeps unemployment away.",
      "description": "Daily job search accountability. Tracks applications submitted and sends follow-up reminders.",
      "sample_text": "Did you apply to at least one job today? Reply YES + the company name, or NO.",
      "frequency": "1x daily (afternoon)",
      "reply_format": "YES [company name] | NO",
      "escalation": "None",
      "setup_questions": [
        "What time should I check in?",
        "Want follow-up reminders for past applications? (YES/NO)"
      ],
      "weekly_report": true,
      "streak_tracking": true,
      "emoji": "💼"
    },
    {
      "id": 25,
      "name": "DateSpark",
      "keyword": "DATENIGHT",
      "category": "Relationships",
      "price_monthly": 3,
      "tagline": "Your relationship called. It wants attention.",
      "description": "Weekly date idea customized to couple profile. Tracks date frequency.",
      "sample_text": "Date night idea: Cook a new recipe together this weekend. Here's one: [link]. Reply BOOKED when planned.",
      "frequency": "1x weekly",
      "reply_format": "BOOKED | SKIP",
      "escalation": "If 3 consecutive SKIPs: 'Hey, it's been 3 weeks without a date. Your partner might not say it, but they notice. Try this week?'",
      "setup_questions": [
        "Budget per date? (FREE / $20 / $50 / $100+)",
        "Kids or no kids at home?",
        "Adventurous or chill vibes?",
        "What day should I suggest dates?"
      ],
      "weekly_report": false,
      "streak_tracking": true,
      "emoji": "❤️"
    },
    {
      "id": 26,
      "name": "GardenClock",
      "keyword": "GARDEN",
      "category": "Home & Life",
      "price_monthly": 3,
      "tagline": "The almanac, but it texts you.",
      "description": "Seasonal planting reminders based on USDA zone. What to plant, when to harvest, frost warnings.",
      "sample_text": "Zone 7a alert: Last frost date is this weekend. Time to transplant tomato seedlings outdoors!",
      "frequency": "2-3x weekly (seasonal, more during planting/harvest)",
      "reply_format": "DONE | THANKS",
      "escalation": "None",
      "setup_questions": [
        "What's your zip code?",
        "What do you grow? (vegetables, flowers, herbs, all)",
        "Beginner or experienced gardener?"
      ],
      "weekly_report": false,
      "streak_tracking": false,
      "emoji": "🌱"
    },
    {
      "id": 27,
      "name": "PetMeds",
      "keyword": "PETMEDS",
      "category": "Home & Life",
      "price_monthly": 3,
      "tagline": "Bella can't remind you herself.",
      "description": "Pet medication reminders with drug name, dosage, and refill alerts.",
      "sample_text": "Bella's heartworm pill is due today (Heartgard Plus, 1 chewable). Reply DONE when given.",
      "frequency": "Per medication schedule (daily, monthly, etc.)",
      "reply_format": "DONE",
      "escalation": "Refill alert 7 days before medication runs out",
      "setup_questions": [
        "Pet's name?",
        "List medications with frequency (e.g., 'Heartgard monthly, Apoquel daily').",
        "When was each medication last given?",
        "Vet appointment interval? (6 months / 12 months / SKIP)"
      ],
      "weekly_report": false,
      "streak_tracking": true,
      "emoji": "🐾"
    },
    {
      "id": 28,
      "name": "SavedToday",
      "keyword": "SAVE",
      "category": "Money & Career",
      "price_monthly": 2,
      "tagline": "$5 today. $1,825 this year. Start.",
      "description": "Daily micro-savings nudge. Tracks cumulative total with monthly celebrations.",
      "sample_text": "Can you move $5 to savings today? Even $1 counts. Reply the amount you saved.",
      "frequency": "1x daily",
      "reply_format": "Number (dollar amount) | 0",
      "escalation": "None",
      "setup_questions": [
        "What time should I nudge you?",
        "Default suggestion amount? ($1 / $5 / $10)"
      ],
      "weekly_report": true,
      "streak_tracking": true,
      "emoji": "🐷"
    },
    {
      "id": 29,
      "name": "WalkMeeting",
      "keyword": "WALKMTG",
      "category": "Health & Body",
      "price_monthly": 2,
      "tagline": "Meetings are boring. Walking is not.",
      "description": "Morning nudge to convert one sitting meeting into a walking meeting.",
      "sample_text": "You probably have meetings today. Could one be a walking meeting? Reply YES if you'll try it.",
      "frequency": "1x daily (weekdays, morning)",
      "reply_format": "YES | NO",
      "escalation": "None",
      "setup_questions": [
        "What time do your workdays start?",
        "Weekdays only? (YES/NO)"
      ],
      "weekly_report": true,
      "streak_tracking": false,
      "emoji": "🚶‍♂️"
    },
    {
      "id": 30,
      "name": "NoSpendDay",
      "keyword": "NOSPEND",
      "category": "Money & Career",
      "price_monthly": 2,
      "tagline": "Can you just... not buy anything today?",
      "description": "Morning commitment + evening accountability for zero-spending days.",
      "sample_text": "Can you make today a no-spend day? Reply YES to commit. I'll check back tonight.",
      "frequency": "2x daily (morning commitment + evening report)",
      "reply_format": "Morning: YES | NO. Evening: YES (kept it) | NO (spent $X)",
      "escalation": "None",
      "setup_questions": [
        "What time for the morning commitment text?",
        "What time for the evening check-in?"
      ],
      "weekly_report": true,
      "streak_tracking": true,
      "emoji": "🚫"
    },
    {
      "id": 31,
      "name": "EyeBreak",
      "keyword": "EYES",
      "category": "Health & Body",
      "price_monthly": 2,
      "tagline": "20-20-20. Your optometrist is begging you.",
      "description": "Every 20 minutes during work hours: look at something 20 feet away for 20 seconds.",
      "sample_text": "20-20-20 break! Look at something 20 feet away for 20 seconds. Reply DONE.",
      "frequency": "Every 20 min during set work hours (customizable)",
      "reply_format": "DONE",
      "escalation": "None",
      "setup_questions": [
        "Work hours? (e.g., 9am-5pm)",
        "Every 20 minutes too much? (20 / 30 / 60 min intervals)"
      ],
      "weekly_report": true,
      "streak_tracking": false,
      "emoji": "👁️"
    },
    {
      "id": 32,
      "name": "CallMom",
      "keyword": "CALLMOM",
      "category": "Relationships",
      "price_monthly": 2,
      "tagline": "She won't be here forever. Call her.",
      "description": "Tracks last call date for up to 5 family members. Nudges at user-set intervals.",
      "sample_text": "It's been 11 days since you called Mom. She'd love to hear from you. Reply CALLED when done.",
      "frequency": "Per contact interval (weekly, bi-weekly, etc.)",
      "reply_format": "CALLED | LATER",
      "escalation": "If LATER, re-sends in 24 hours",
      "setup_questions": [
        "Who should I remind you to call? (Up to 5 people with names.)",
        "How often for each? (weekly / every 2 weeks / monthly)",
        "Best time for reminders?"
      ],
      "weekly_report": false,
      "streak_tracking": true,
      "emoji": "📞"
    },
    {
      "id": 33,
      "name": "OneDeclutter",
      "keyword": "DECLUTTER",
      "category": "Home & Life",
      "price_monthly": 2,
      "tagline": "One thing. Every day. 365 things gone by December.",
      "description": "Daily prompt to remove one item from your home. Tracks total items decluttered.",
      "sample_text": "Get rid of one thing today. Donate it, trash it, or recycle it. What did you remove? Reply with the item.",
      "frequency": "1x daily",
      "reply_format": "Free text (item name) | SKIP",
      "escalation": "None",
      "setup_questions": [
        "What time works best?",
        "Starting focus area? (closet / kitchen / garage / random)"
      ],
      "weekly_report": true,
      "streak_tracking": true,
      "emoji": "🗑️"
    },
    {
      "id": 34,
      "name": "ProteinCheck",
      "keyword": "PROTEIN",
      "category": "Health & Body",
      "price_monthly": 2,
      "tagline": "Eat the protein. Build the muscle. Repeat.",
      "description": "2-3 daily check-ins tracking protein intake against a personalized goal.",
      "sample_text": "How many grams of protein have you eaten today so far?",
      "frequency": "2-3x daily (lunch + dinner + optional morning)",
      "reply_format": "Number (grams)",
      "escalation": "Evening nudge if under 50% of goal by 6pm",
      "setup_questions": [
        "Daily protein goal in grams? (Default: 100g)",
        "Check-in times? (Default: 12pm, 6pm)"
      ],
      "weekly_report": true,
      "streak_tracking": true,
      "emoji": "🥩"
    },
    {
      "id": 35,
      "name": "MindfulMinute",
      "keyword": "BREATHE",
      "category": "Mind & Mood",
      "price_monthly": 2,
      "tagline": "60 seconds. No app. Just breathe.",
      "description": "2-3 daily texts with a one-minute breathing or mindfulness exercise.",
      "sample_text": "Take 60 seconds right now. Close your eyes. Breathe in for 4, hold for 4, out for 6. Reply DONE.",
      "frequency": "2-3x daily",
      "reply_format": "DONE | SKIP",
      "escalation": "None",
      "setup_questions": [
        "How many times per day? (1 / 2 / 3)",
        "Preferred times?"
      ],
      "weekly_report": true,
      "streak_tracking": true,
      "emoji": "🧘‍♀️"
    },
    {
      "id": 36,
      "name": "BikeLog",
      "keyword": "BIKE",
      "category": "Health & Body",
      "price_monthly": 2,
      "tagline": "Pedal. Log. Repeat.",
      "description": "Daily cycling mileage tracker with weekly/monthly totals and personal bests.",
      "sample_text": "Did you ride today? Reply with your miles (or NO).",
      "frequency": "1x daily (evening)",
      "reply_format": "Number (miles) | NO",
      "escalation": "None",
      "setup_questions": [
        "Weekly mileage goal? (or SKIP)",
        "What time should I ask?"
      ],
      "weekly_report": true,
      "streak_tracking": true,
      "emoji": "🚴"
    },
    {
      "id": 37,
      "name": "SkinRoutine",
      "keyword": "SKINCARE",
      "category": "Health & Body",
      "price_monthly": 3,
      "tagline": "Cleanse. Treat. Moisturize. Don't skip.",
      "description": "Morning and evening skincare routine accountability with streak tracking.",
      "sample_text": "PM skincare check: Did you cleanse, treat, and moisturize tonight? Reply YES or SKIP.",
      "frequency": "2x daily (morning + evening)",
      "reply_format": "YES | SKIP",
      "escalation": "None",
      "setup_questions": [
        "Track AM routine, PM routine, or both?",
        "What time for AM? PM?"
      ],
      "weekly_report": true,
      "streak_tracking": true,
      "emoji": "✨"
    },
    {
      "id": 38,
      "name": "OneGoodDeed",
      "keyword": "KINDNESS",
      "category": "Mind & Mood",
      "price_monthly": 2,
      "tagline": "Be the reason someone smiles today.",
      "description": "Daily kindness challenge with a specific, small act. Tracks streak of good deeds.",
      "sample_text": "Today's kindness challenge: Compliment a coworker on something specific they did well. Reply DONE and tell me what you did.",
      "frequency": "1x daily (morning)",
      "reply_format": "DONE + free text | SKIP",
      "escalation": "None",
      "setup_questions": [
        "What time should I send today's challenge?"
      ],
      "weekly_report": false,
      "streak_tracking": true,
      "emoji": "🤝"
    },
    {
      "id": 39,
      "name": "ProduceTracker",
      "keyword": "VEGGIES",
      "category": "Health & Body",
      "price_monthly": 2,
      "tagline": "Eat. Your. Vegetables.",
      "description": "Evening text tracking fruit and vegetable servings against a 5+ daily goal.",
      "sample_text": "How many servings of fruits/vegetables did you eat today? (Goal: 5+)",
      "frequency": "1x daily (evening)",
      "reply_format": "Number (servings)",
      "escalation": "None",
      "setup_questions": [
        "Daily serving goal? (Default: 5)",
        "What time should I ask?"
      ],
      "weekly_report": true,
      "streak_tracking": true,
      "emoji": "🥦"
    },
    {
      "id": 40,
      "name": "PasswordRotate",
      "keyword": "PASSWORD",
      "category": "Home & Life",
      "price_monthly": 2,
      "tagline": "Your password is 'password123' and we need to talk.",
      "description": "Monthly password change reminder for one critical account. Quarterly 2FA nudges.",
      "sample_text": "Monthly security check: Change one important password today. Start with your email. Reply DONE.",
      "frequency": "1x monthly + 1x quarterly (2FA check)",
      "reply_format": "DONE",
      "escalation": "None",
      "setup_questions": [
        "What day of the month? (Default: 1st)"
      ],
      "weekly_report": false,
      "streak_tracking": true,
      "emoji": "🔐"
    },
    {
      "id": 41,
      "name": "PosturePing",
      "keyword": "POSTURE",
      "category": "Health & Body",
      "price_monthly": 2,
      "tagline": "Sit up straight. Yes, right now.",
      "description": "Random texts 3-4x during work hours catching you slouching. Tracks daily corrections.",
      "sample_text": "Posture check! Are you sitting up straight right now? Roll your shoulders back. Reply FIXED.",
      "frequency": "3-4x daily (random within work hours)",
      "reply_format": "FIXED",
      "escalation": "None",
      "setup_questions": [
        "Work hours? (e.g., 9am-5pm)"
      ],
      "weekly_report": true,
      "streak_tracking": false,
      "emoji": "🪑"
    },
    {
      "id": 42,
      "name": "BabyLog",
      "keyword": "BABY",
      "category": "Home & Life",
      "price_monthly": 3,
      "tagline": "How many diapers? How many feedings? Yes, we track it.",
      "description": "End-of-day baby metrics logging. Weekly summary to both parents and optionally the pediatrician.",
      "sample_text": "Baby log time! Reply: D[diapers] F[feedings] and any notes. Example: D8 F6 fussy afternoon.",
      "frequency": "1x daily (evening)",
      "reply_format": "D[number] F[number] + optional free text",
      "escalation": "None",
      "setup_questions": [
        "Baby's name?",
        "Baby's age?",
        "What time for the daily log?",
        "Send weekly summary to another parent? (phone number or SKIP)"
      ],
      "weekly_report": true,
      "streak_tracking": false,
      "emoji": "👶"
    },
    {
      "id": 43,
      "name": "DrinkLess",
      "keyword": "DRINKLESS",
      "category": "Health & Body",
      "price_monthly": 4,
      "tagline": "Fewer drinks. Better mornings. No judgment.",
      "description": "Daily morning text tracking previous day's alcohol consumption. Non-judgmental tracking against a user-set goal.",
      "sample_text": "How many drinks did you have yesterday? Reply with the number. (0 is great!)",
      "frequency": "1x daily (morning)",
      "reply_format": "Number (drinks)",
      "escalation": "If weekly total exceeds goal by 50%+, sends gentle check-in",
      "setup_questions": [
        "What's your weekly drink goal? (e.g., 7 drinks/week)",
        "What time should I ask?",
        "Tracking for health, training, or sobriety?"
      ],
      "weekly_report": true,
      "streak_tracking": true,
      "emoji": "🍷"
    },
    {
      "id": 44,
      "name": "FactOfTheDay",
      "keyword": "FACTS",
      "category": "Mind & Mood",
      "price_monthly": 2,
      "tagline": "Get smarter in 10 seconds.",
      "description": "Daily fascinating fact from science, history, or nature. Weekly quiz on the week's facts.",
      "sample_text": "Today's fact: Octopuses have three hearts and blue blood. The two side hearts pump blood to the gills. Reply COOL or KNEW IT.",
      "frequency": "1x daily + 1x weekly quiz (Friday)",
      "reply_format": "COOL | KNEW IT | quiz answers",
      "escalation": "None",
      "setup_questions": [
        "Favorite topics? (science / history / nature / space / all)",
        "What time for your daily fact?"
      ],
      "weekly_report": false,
      "streak_tracking": true,
      "emoji": "🧪"
    },
    {
      "id": 45,
      "name": "GoalPing",
      "keyword": "GOALS",
      "category": "Money & Career",
      "price_monthly": 3,
      "tagline": "Your goal doesn't care about your mood. Show up.",
      "description": "Daily check-in on progress toward 1-3 personal goals. Weekly progress summary.",
      "sample_text": "Your goal: Run a 5K by June 1. Did you do anything today toward this goal? Reply what you did (or NO).",
      "frequency": "1x daily (rotates through goals)",
      "reply_format": "Free text (action taken) | NO",
      "escalation": "After 5 consecutive NOs: 'It's been 5 days with no progress on [goal]. Want to adjust the goal, or recommit?'",
      "setup_questions": [
        "List 1-3 goals with target dates.",
        "What time should I check in?"
      ],
      "weekly_report": true,
      "streak_tracking": true,
      "emoji": "🎯"
    },
    {
      "id": 46,
      "name": "VolunteerNudge",
      "keyword": "VOLUNTEER",
      "category": "Mind & Mood",
      "price_monthly": 2,
      "tagline": "The world needs you for 2 hours this month.",
      "description": "Bi-weekly volunteer opportunity suggestions matched to interests and location. Tracks hours.",
      "sample_text": "You haven't volunteered in 23 days. Here's one near you this Saturday: food bank shift, 9am-11am. Reply INTERESTED or SKIP.",
      "frequency": "Bi-weekly",
      "reply_format": "INTERESTED | SKIP",
      "escalation": "None",
      "setup_questions": [
        "Zip code?",
        "Interests? (animals / food / elderly / environment / kids / any)",
        "Weekends only or weekdays too?"
      ],
      "weekly_report": false,
      "streak_tracking": false,
      "emoji": "🤲"
    },
    {
      "id": 47,
      "name": "DogWalk",
      "keyword": "DOGWALK",
      "category": "Home & Life",
      "price_monthly": 2,
      "tagline": "Buddy is staring at you. You know what that means.",
      "description": "Daily dog walk tracker with weekly summary. Vet-recommended frequency reminders.",
      "sample_text": "Did you walk Buddy today? Reply YES + minutes (e.g., YES 30) or NO.",
      "frequency": "1x daily (evening)",
      "reply_format": "YES [minutes] | NO",
      "escalation": "None",
      "setup_questions": [
        "Dog's name?",
        "Breed/size? (for exercise recommendations)",
        "What time for the daily check-in?"
      ],
      "weekly_report": true,
      "streak_tracking": true,
      "emoji": "🐕"
    },
    {
      "id": 48,
      "name": "SunriseClub",
      "keyword": "SUNRISE",
      "category": "Mind & Mood",
      "price_monthly": 3,
      "tagline": "The alarm you can't snooze.",
      "description": "Daily text 15 min before local sunrise. Must reply before deadline to keep streak.",
      "sample_text": "Sunrise is at 6:47 AM today. Are you up? Reply YES before 7:00 AM to keep your streak. Current streak: 14 days.",
      "frequency": "1x daily (15 min before sunrise)",
      "reply_format": "YES (must be before deadline)",
      "escalation": "None (missed deadline = broken streak, that IS the punishment)",
      "setup_questions": [
        "Zip code? (for sunrise times)",
        "How much grace period after sunrise? (0 / 15 / 30 min)"
      ],
      "weekly_report": true,
      "streak_tracking": true,
      "emoji": "🌅"
    },
    {
      "id": 49,
      "name": "CoupleCheckIn",
      "keyword": "COUPLE",
      "category": "Relationships",
      "price_monthly": 4,
      "tagline": "Rate your week. Compare notes. Talk about it.",
      "description": "Weekly check-in to both partners separately. Compares scores and sends a joint conversation starter.",
      "sample_text": "Weekly couple check-in: On a scale of 1-10, how connected did you feel to your partner this week?",
      "frequency": "1x weekly (Sunday evening)",
      "reply_format": "Number 1-10",
      "escalation": "If both partners score 4 or below for 2 consecutive weeks, sends couples resource suggestion",
      "setup_questions": [
        "Partner's phone number?",
        "What day for the weekly check-in? (Default: Sunday)",
        "What time?"
      ],
      "weekly_report": true,
      "streak_tracking": false,
      "emoji": "💑"
    },
    {
      "id": 50,
      "name": "ElderCheck",
      "keyword": "ELDERCHECK",
      "category": "Relationships",
      "price_monthly": 5,
      "tagline": "Peace of mind. One text a day.",
      "description": "Daily wellness check for elderly individuals. Alerts a family member if no response by set time.",
      "sample_text": "Good morning, Margaret! How are you feeling today? Reply OK or NEED HELP.",
      "frequency": "1x daily (morning)",
      "reply_format": "OK | NEED HELP | free text",
      "escalation": "If no reply by 2 hours after send time, alerts designated family contact. If NEED HELP, immediately alerts family contact.",
      "setup_questions": [
        "Senior's first name?",
        "What time should we check in?",
        "Emergency contact phone number (REQUIRED)?",
        "Alert after how many hours of no reply? (Default: 2)"
      ],
      "weekly_report": true,
      "streak_tracking": false,
      "emoji": "👵"
    }
  ]
}
```

---

## Quick Reference Table

| # | Service | Keyword | Category | Price | Frequency | Reply Format |
|---|---------|---------|----------|-------|-----------|-------------|
| 1 | PillPing | PILLS | Health & Body | $3/mo | 1x daily | YES/NO/SNOOZE |
| 2 | HydroNudge | WATER | Health & Body | $2/mo | 3-4x daily | Number |
| 3 | FriendPoke | FRIENDS | Relationships | $3/mo | 1x daily | DONE/SKIP |
| 4 | StepCheck | STEPS | Health & Body | $2/mo | 1x daily | Number |
| 5 | MoodPulse | MOOD | Mind & Mood | $4/mo | 1x daily | 1-5 |
| 6 | GratitudeText | GRATEFUL | Mind & Mood | $2/mo | 1x daily | Free text |
| 7 | SpendAlert | SPENDING | Money & Career | $3/mo | 1x daily | Number |
| 8 | SleepLog | SLEEP | Health & Body | $2/mo | 1x daily | Number |
| 9 | ScreenBreak | SCREEN | Mind & Mood | $3/mo | 1x daily | Number |
| 10 | PlantParent | PLANTS | Home & Life | $2/mo | Variable | DONE |
| 11 | ReadingStreak | READ | Mind & Mood | $2/mo | 1x daily | YES/NO |
| 12 | SunscreenReminder | SUNSCREEN | Health & Body | $2/mo | 1x daily | YES/NO |
| 13 | FlossCoach | FLOSS | Health & Body | $2/mo | 1x daily | YES/NO |
| 14 | DadText | DADTEXT | Relationships | $3/mo | 1x daily | DONE/SKIP |
| 15 | BPLog | BP | Health & Body | $4/mo | 2x daily | XXX/XX |
| 16 | WeightLog | WEIGHT | Health & Body | $2/mo | 1x daily | Number |
| 17 | StretchBreak | STRETCH | Health & Body | $2/mo | 3-4x daily | DONE/SKIP |
| 18 | MealPrep | MEALPREP | Home & Life | $3/mo | 1x Sun + 1x daily | GO/SKIP |
| 19 | JournalPrompt | JOURNAL | Mind & Mood | $2/mo | 1x daily | Free text |
| 20 | DebtCoach | DEBT | Money & Career | $4/mo | 1x weekly | YES/NO/amount |
| 21 | SobrietyCounter | SOBER | Health & Body | $3/mo | 1x daily | CHECK-IN/OK |
| 22 | ParentWin | PARENTWIN | Relationships | $2/mo | 1x daily | DONE/SKIP |
| 23 | VocabDrip | VOCAB | Mind & Mood | $3/mo | 1x daily + quiz | Free text |
| 24 | ApplyOne | JOBHUNT | Money & Career | $4/mo | 1x daily | YES [co]/NO |
| 25 | DateSpark | DATENIGHT | Relationships | $3/mo | 1x weekly | BOOKED/SKIP |
| 26 | GardenClock | GARDEN | Home & Life | $3/mo | 2-3x weekly | DONE/THANKS |
| 27 | PetMeds | PETMEDS | Home & Life | $3/mo | Per med schedule | DONE |
| 28 | SavedToday | SAVE | Money & Career | $2/mo | 1x daily | Number |
| 29 | WalkMeeting | WALKMTG | Health & Body | $2/mo | 1x daily (weekdays) | YES/NO |
| 30 | NoSpendDay | NOSPEND | Money & Career | $2/mo | 2x daily | YES/NO |
| 31 | EyeBreak | EYES | Health & Body | $2/mo | Every 20-60 min | DONE |
| 32 | CallMom | CALLMOM | Relationships | $2/mo | Per contact interval | CALLED/LATER |
| 33 | OneDeclutter | DECLUTTER | Home & Life | $2/mo | 1x daily | Free text |
| 34 | ProteinCheck | PROTEIN | Health & Body | $2/mo | 2-3x daily | Number |
| 35 | MindfulMinute | BREATHE | Mind & Mood | $2/mo | 2-3x daily | DONE/SKIP |
| 36 | BikeLog | BIKE | Health & Body | $2/mo | 1x daily | Number/NO |
| 37 | SkinRoutine | SKINCARE | Health & Body | $3/mo | 2x daily | YES/SKIP |
| 38 | OneGoodDeed | KINDNESS | Mind & Mood | $2/mo | 1x daily | DONE + text |
| 39 | ProduceTracker | VEGGIES | Health & Body | $2/mo | 1x daily | Number |
| 40 | PasswordRotate | PASSWORD | Home & Life | $2/mo | 1x monthly | DONE |
| 41 | PosturePing | POSTURE | Health & Body | $2/mo | 3-4x daily | FIXED |
| 42 | BabyLog | BABY | Home & Life | $3/mo | 1x daily | D#F# + text |
| 43 | DrinkLess | DRINKLESS | Health & Body | $4/mo | 1x daily | Number |
| 44 | FactOfTheDay | FACTS | Mind & Mood | $2/mo | 1x daily + quiz | COOL/KNEW IT |
| 45 | GoalPing | GOALS | Money & Career | $3/mo | 1x daily | Free text/NO |
| 46 | VolunteerNudge | VOLUNTEER | Mind & Mood | $2/mo | Bi-weekly | INTERESTED/SKIP |
| 47 | DogWalk | DOGWALK | Home & Life | $2/mo | 1x daily | YES #/NO |
| 48 | SunriseClub | SUNRISE | Mind & Mood | $3/mo | 1x daily (pre-sunrise) | YES (timed) |
| 49 | CoupleCheckIn | COUPLE | Relationships | $4/mo | 1x weekly | 1-10 |
| 50 | ElderCheck | ELDERCHECK | Relationships | $5/mo | 1x daily | OK/NEED HELP |

---

## Category Summary

| Category | Count | Price Range |
|----------|-------|-------------|
| Health & Body | 21 | $2-4/mo |
| Mind & Mood | 12 | $2-4/mo |
| Relationships | 8 | $2-5/mo |
| Money & Career | 7 | $2-4/mo |
| Home & Life | 8 | $2-3/mo |

---

## Twilio Implementation Notes

### Inbound Flow
1. User texts **keyword** to BotherMe number
2. System checks if keyword matches a service
3. If match: initiate onboarding flow (ask setup_questions sequentially via SMS)
4. If no match: reply "Hmm, I don't recognize that one. Text MENU for the full list, or try one of these: WATER, PILLS, FLOSS, MOOD, FRIENDS"
5. After setup: confirm subscription, first text goes out at next scheduled time

### Special Keywords (Reserved)
- `START` — General onboarding, shows category menu
- `STOP` — Unsubscribe from all services immediately
- `PAUSE` — Pause all services (retain data, stop texts)
- `RESUME` — Resume paused services
- `MENU` — List all available services
- `STATUS` — Show active subscriptions + streak counts
- `HELP` — Customer support info
- `CANCEL [SERVICE]` — Cancel a specific service (e.g., "CANCEL WATER")
- `BILLING` — Link to Stripe billing portal

### Reply Routing Logic
- When user replies, check their active services for context
- If user has only 1 active service: route reply to that service
- If user has multiple active services: match reply format to determine service (e.g., "128/82" → BPLog, "YES 30" → DogWalk, bare number → context from most recent outbound text)
- If ambiguous: reply "Got it! Was that for [Service A] or [Service B]? Reply A or B."

### Escalation Rules
- Services with `escalation` field: implement the described logic
- SobrietyCounter: if reply contains keywords (help, hurt, hopeless, suicide, die, can't do this), immediately send: "I hear you. You're not alone. Text HOME to 741741 or call 988. I'll be here tomorrow too."
- ElderCheck: NEED HELP triggers immediate alert to emergency contact via SMS + phone call attempt
