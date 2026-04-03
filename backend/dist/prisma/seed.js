"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Seeding database...');
    const languages = await Promise.all([
        prisma.language.upsert({
            where: { code: 'en' },
            update: {},
            create: { code: 'en', name: 'English', flag: '🇬🇧', isActive: true },
        }),
        prisma.language.upsert({
            where: { code: 'az' },
            update: {},
            create: { code: 'az', name: 'Azerbaijani', flag: '🇦🇿', isActive: true },
        }),
        prisma.language.upsert({
            where: { code: 'tr' },
            update: {},
            create: { code: 'tr', name: 'Turkish', flag: '🇹🇷', isActive: true },
        }),
        prisma.language.upsert({
            where: { code: 'ru' },
            update: {},
            create: { code: 'ru', name: 'Russian', flag: '🇷🇺', isActive: true },
        }),
    ]);
    console.log(`  ✅ ${languages.length} languages created`);
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@linguaread.com' },
        update: {},
        create: {
            username: 'admin',
            email: 'admin@linguaread.com',
            passwordHash: adminPassword,
            role: client_1.Role.ADMIN,
            level: 10,
            xp: 5000,
            profile: {
                create: {
                    firstName: 'Admin',
                    lastName: 'User',
                    country: 'Global',
                    timezone: 'UTC',
                },
            },
            readingStats: {
                create: {
                    totalWordsRead: 50000,
                    totalReadingTime: 10000,
                    storiesCompleted: 25,
                    vocabularyLearned: 500,
                    currentStreak: 30,
                    longestStreak: 100,
                },
            },
        },
    });
    console.log(`  ✅ Admin user: admin@linguaread.com / admin123`);
    const userPassword = await bcrypt.hash('user123456', 10);
    const user = await prisma.user.upsert({
        where: { email: 'user@example.com' },
        update: {},
        create: {
            username: 'testuser',
            email: 'user@example.com',
            passwordHash: userPassword,
            role: client_1.Role.USER,
            level: 3,
            xp: 1500,
            streakDays: 15,
            profile: {
                create: {
                    firstName: 'Test',
                    lastName: 'User',
                    country: 'USA',
                    timezone: 'America/New_York',
                },
            },
            readingStats: {
                create: {
                    totalWordsRead: 8000,
                    totalReadingTime: 1200,
                    storiesCompleted: 4,
                    vocabularyLearned: 120,
                    currentStreak: 15,
                    longestStreak: 25,
                },
            },
        },
    });
    console.log(`  ✅ Test user: user@example.com / user123456`);
    const tagNames = ['travel', 'culture', 'food', 'daily life', 'technology', 'science', 'nature', 'hobby', 'literature', 'art', 'tips', 'adventure'];
    const tags = {};
    for (const name of tagNames) {
        const tag = await prisma.tag.upsert({
            where: { name },
            update: {},
            create: { name },
        });
        tags[name] = tag.id;
    }
    console.log(`  ✅ ${tagNames.length} tags created`);
    const stories = [
        {
            title: 'A Morning in Paris',
            slug: 'a-morning-in-paris',
            level: client_1.Level.A2,
            content: `The sun rose over the Seine, casting golden light on the ancient buildings. Marie walked along the cobblestone streets, breathing in the fresh morning air. The smell of freshly baked bread wafted from the nearby boulangerie. She stopped at her favorite café, where the barista greeted her with a warm smile.\n\n"The usual?" he asked, already reaching for a cup.\n\nMarie nodded. She loved this routine. Every morning, rain or shine, she would walk from her small apartment near Montmartre to this little café on Rue de Rivoli. It was her way of connecting with the city she had called home for the past three years.\n\nAs she sipped her café au lait, she watched the world wake up around her. Tourists began to appear, cameras in hand, marveling at the architecture. Local shopkeepers opened their doors, arranging displays of flowers, cheeses, and pastries.\n\nParis was never truly quiet, but these early mornings came close. There was a peacefulness in the routine, a rhythm that Marie had come to cherish. She pulled out her notebook and began to write, capturing the morning light in words.`,
            tagNames: ['travel', 'culture'],
        },
        {
            title: 'The Little Cafe',
            slug: 'the-little-cafe',
            level: client_1.Level.A1,
            content: `Every day, Maria opened her cafe at seven o'clock. The smell of fresh coffee filled the air. Her first customer was always Mr. Johnson, an old man who lived nearby. He ordered the same thing every morning: one black coffee and a croissant.\n\nMaria liked her routine. It made her happy to see her regular customers. They always smiled when they came in. The cafe was small, but it was warm and friendly.\n\n"Good morning, Mr. Johnson!" Maria said with a big smile.\n\n"Good morning, Maria. The usual, please," he replied.\n\nMaria made his coffee carefully. She knew exactly how he liked it. Not too hot, not too cold. Mr. Johnson sat at his favorite table by the window. He liked to watch the people walk by.\n\nMaria loved her little cafe. It was her dream since she was a young girl. Now, every morning, her dream came true.`,
            tagNames: ['daily life', 'food'],
        },
        {
            title: 'Technology and Society',
            slug: 'technology-and-society',
            level: client_1.Level.B1,
            content: `The rapid advancement of artificial intelligence presents both unprecedented opportunities and significant challenges for modern society. As machine learning algorithms become increasingly sophisticated, questions about privacy, employment, and ethical considerations come to the forefront.\n\nConsider how AI has already transformed our daily lives. Virtual assistants help us manage our schedules. Recommendation algorithms suggest what we should watch, read, and buy. Translation tools break down language barriers that once seemed insurmountable.\n\nYet, these conveniences come at a cost. Our personal data fuels these systems. Every search, every click, every purchase contributes to a digital profile that companies use to predict and influence our behavior.\n\nThe question is not whether technology will continue to advance — it will. The real question is how we choose to govern and regulate these powerful tools. Will we find a balance between innovation and privacy? Between efficiency and employment?\n\nThese are not merely technical questions. They are fundamentally human questions that require input from all sectors of society.`,
            tagNames: ['technology', 'science'],
        },
        {
            title: 'Gardening Basics',
            slug: 'gardening-basics',
            level: client_1.Level.A1,
            content: `Starting a garden is easier than you think. All you need is a small space, some good soil, and a few seeds. Begin with simple plants like tomatoes or herbs. Water them regularly and make sure they get enough sunlight.\n\nFirst, find a good spot. Your plants need at least six hours of sunlight each day. A window or a balcony can work well for small gardens.\n\nNext, get some pots and soil. You can buy these at any garden store. Fill the pots with soil and plant your seeds. Cover them with a thin layer of soil.\n\nWater your plants every day. Don't give them too much water. The soil should be moist, not wet. Soon you will see green leaves growing.\n\nGardening is a wonderful hobby. It helps you relax and you can eat the food you grow. There is nothing better than a tomato from your own garden!`,
            tagNames: ['nature', 'hobby'],
        },
        {
            title: 'The Last Symphony',
            slug: 'the-last-symphony',
            level: client_1.Level.B2,
            content: `In the twilight of his career, the composer sat before the blank manuscript, his quill hovering uncertainly above the parchment. The weight of expectation pressed upon his shoulders like a physical force. Critics and patrons alike awaited his magnum opus, the culmination of decades spent perfecting his craft.\n\nYet inspiration, that fickle muse, remained elusive.\n\nHe closed his eyes and listened to the silence of his study, searching for a melody amidst the void. The old clock on the mantelpiece ticked away the seconds with merciless precision, each click a reminder of the time he could never reclaim.\n\nThroughout his illustrious career, music had flowed through him like a river — sometimes a gentle stream, sometimes a raging torrent, but always present, always alive. Now, for the first time, the river had run dry, leaving him stranded on the banks of his own ambition.\n\nHe thought of the great works that had preceded this moment. The triumphant marches, the delicate nocturnes, the soaring arias that had brought audiences to their feet and critics to their knees. Each piece had been a fragment of his soul, offered freely to the world.\n\nWhat more could he possibly give?`,
            tagNames: ['literature', 'art'],
        },
        {
            title: 'Travel Tips for Europe',
            slug: 'travel-tips-for-europe',
            level: client_1.Level.A2,
            content: `Traveling through Europe on a budget requires planning, but the experiences are worth every effort. Start by booking accommodations in advance, especially during peak tourist seasons.\n\nConsider staying in hostels or using platforms that connect travelers with local hosts. These options are usually much cheaper than hotels. Many hostels also have kitchens where you can cook your own meals.\n\nPublic transportation is excellent in most European cities. Buy a day pass or a weekly pass to save money. Trains are a great way to travel between cities. Book early for the best prices.\n\nEat like a local. Skip the tourist restaurants and look for places where local people eat. Street food is often delicious and cheap. Markets are also great places to find fresh, affordable food.\n\nFinally, explore the free attractions. Many museums have free entry on certain days. Walking tours are a wonderful way to discover a city. Parks, churches, and public squares are always free to visit.\n\nWith a little planning, Europe can be an affordable and unforgettable adventure!`,
            tagNames: ['travel', 'tips'],
        },
    ];
    for (const storyData of stories) {
        const wordCount = storyData.content.split(/\s+/).length;
        const readingTimeMinutes = Math.ceil(wordCount / 200);
        await prisma.story.upsert({
            where: { slug: storyData.slug },
            update: {},
            create: {
                title: storyData.title,
                slug: storyData.slug,
                content: {
                    create: {
                        content: storyData.content,
                    },
                },
                level: storyData.level,
                wordCount,
                readingTimeMinutes,
                authorId: admin.id,
                published: true,
                tags: {
                    create: storyData.tagNames.map((name) => ({ tagId: tags[name] })),
                },
            },
        });
    }
    console.log(`  ✅ ${stories.length} stories created`);
    const achievements = [
        { name: 'First Story', description: 'Complete your first story', icon: '📖', xpReward: 50, category: 'reading' },
        { name: 'Bookworm', description: 'Complete 10 stories', icon: '📚', xpReward: 200, category: 'reading' },
        { name: 'Word Collector', description: 'Learn 100 vocabulary words', icon: '🔤', xpReward: 300, category: 'vocabulary' },
        { name: 'Speed Reader', description: 'Read 10,000 words', icon: '⚡', xpReward: 150, category: 'reading' },
        { name: 'Streak Master', description: 'Maintain a 7-day reading streak', icon: '🔥', xpReward: 100, category: 'consistency' },
        { name: 'Quiz Champion', description: 'Score 100% on 5 quizzes', icon: '🏆', xpReward: 250, category: 'learning' },
        { name: 'Explorer', description: 'Read stories from all 4 levels', icon: '🌍', xpReward: 200, category: 'progression' },
    ];
    for (const ach of achievements) {
        const existing = await prisma.achievement.findFirst({
            where: { name: ach.name },
        });
        if (!existing) {
            await prisma.achievement.create({
                data: ach,
            });
        }
    }
    console.log(`  ✅ ${achievements.length} achievements created`);
    const words = [
        { word: 'cobblestone', definition: 'A small, rounded stone used to cover roads', exampleSentence: 'She walked along the cobblestone streets.', phonetic: '/ˈkɒb.əl.stəʊn/', level: client_1.Level.A2 },
        { word: 'boulangerie', definition: 'A French bakery', exampleSentence: 'The smell of bread came from the nearby boulangerie.', phonetic: '/buˌlɑ̃ʒ.ʁi/', level: client_1.Level.A2 },
        { word: 'routine', definition: 'A regular way of doing things', exampleSentence: 'Maria liked her daily routine.', phonetic: '/ruːˈtiːn/', level: client_1.Level.A1 },
        { word: 'algorithm', definition: 'A set of rules for solving a problem', exampleSentence: 'Machine learning algorithms are increasingly sophisticated.', phonetic: '/ˈæl.ɡə.rɪ.ðəm/', level: client_1.Level.B1 },
        { word: 'unprecedented', definition: 'Never done or known before', exampleSentence: 'AI presents unprecedented opportunities.', phonetic: '/ʌnˈpres.ɪ.den.tɪd/', level: client_1.Level.B2 },
        { word: 'moist', definition: 'Slightly wet', exampleSentence: 'The soil should be moist, not wet.', phonetic: '/mɔɪst/', level: client_1.Level.A1 },
        { word: 'manuscript', definition: 'A handwritten or typed text', exampleSentence: 'The composer sat before the blank manuscript.', phonetic: '/ˈmæn.jʊ.skrɪpt/', level: client_1.Level.B2 },
        { word: 'elusive', definition: 'Difficult to find or achieve', exampleSentence: 'Inspiration remained elusive.', phonetic: '/ɪˈluː.sɪv/', level: client_1.Level.B2 },
    ];
    for (const w of words) {
        const existing = await prisma.vocabulary.findFirst({
            where: { word: w.word },
        });
        if (!existing) {
            await prisma.vocabulary.create({
                data: w,
            });
        }
    }
    console.log(`  ✅ ${words.length} vocabulary words created`);
    console.log('\n🎉 Seed completed successfully!');
}
main()
    .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map