// Blogs cards data
export interface Blogs {
    id: number;
    category: string;
    image: string;
    author: string;
    title: string;
    date: string;
}

export const blogs: Blogs[] = [
    {
        id: 1,
        category: "2020",
        image: "/yourhour-website-img/yourhourapp_Letter-To-Device_gap.webp",
        author: "Wesley D'Souza",
        title: "A Letter To My Smartphone!",
        date: "Mar 14, 2020",
    },
    {
        id: 2,
        category: "2020",
        image:
            "/yourhour-website-img/yourhourapp_Girl-using-charging-smartphone_gap.webp",
        author: "Wesley D'Souza",
        title: "Phone Addiction",
        date: "April 16, 2020",
    },
    {
        id: 3,
        category: "2020",
        image: "/yourhour-website-img/yourhourapp_Humanity_gap.webp",
        author: "Wesley D'Souza",
        title: "The Great Covid Realisation",
        date: "May 18, 2020",
    },
    {
        id: 4,
        category: "2020",
        image: "/yourhour-website-img/yourhourapp_meditation_gap.webp",
        author: "Wesley D'Souza",
        title: "Mindfulness and Productivity",
        date: "June 21, 2020",
    },
    {
        id: 5,
        category: "2020",
        image: "/yourhour-website-img/yourhourapp_Nickel-Boys_gap.webp",
        author: "Wesley D'Souza",
        title:
            "A Review of Colson Whitehead's Pulitzer Prize-winning novel 'Nickel Boys'",
        date: "July 01, 2020",
    },
    {
        id: 6,
        category: "2019",
        image: "/yourhour-website-img/yourhourapp_looking-for-solution_gap.webp",
        author: "Daksh Haldar",
        title: "Procrastination and Ways to Overcome It",
        date: "June 30, 2019",
    },
    {
        id: 7,
        category: "2019",
        image: "/yourhour-website-img/yourhourapp_To-Do-List_gap.webp",
        author: "Daksh Haldar",
        title: "Three Ways to Manage Your Time",
        date: "May 14, 2019",
    },
    {
        id: 8,
        category: "2019",
        image: "/yourhour-website-img/yourhourapp_work-from-home-and-office_gap.webp",
        author: "Daksh Haldar",
        title: "The Office Away From Office",
        date: "June 16, 2019",
    },
    {
        id: 9,
        category: "2019",
        image: "/yourhour-website-img/Youhour_app_Top.webp",
        author: "Daksh Haldar",
        title: 'The Difference between "AVERAGE AND SUCCESS"',
        date: "July 16, 2019",
    },
    {
        id: 10,
        category: "2018",
        image: "/yourhour-website-img/yourhourapp_relationship_gap5_3.webp",
        author: "Jamila Johar",
        title: '"YOUNG V/S THE OLD!" Smart Phones Seperating Generations!',
        date: "March 16, 2018",
    },
    {
        id: 11,
        category: "2018",
        image: "/yourhour-website-img/YourHour_app_NewDrug.webp",
        author: "Jamila Johar",
        title: '"MOBILE ADDICTION" The Show Behind!',
        date: "April 16, 2018",
    },
    {
        id: 12,
        category: "2019",
        image: "/yourhour-website-img/YourHour_app_Boredom_Top.webp",
        author: "Daksh Haldar",
        title: '"BOREDOM = CREATIVITY" The Art Of Doing Nothing!',
        date: "June 10, 2019",
    },
];

// Popular posts data
export const popularPosts = [
    {
        id: 12,
        title: '"BOREDOM = CREATIVITY" The Art Of Doing Nothing!',
        date: "June 10, 2019",
        image: "/yourhour-website-img/YourHour_app_Boredom_Top.webp",
    },
    {
        id: 4,
        title: "Mindfulness and Productivity!",
        date: "June 21, 2019",
        image: "/yourhour-website-img/yourhourapp_meditation_gap.webp",
    },
    {
        id: 6,
        title: "Procrastination and Ways to Overcome It",
        date: "June 30, 2019",
        image: "/yourhour-website-img/yourhourapp_looking-for-solution_gap.webp"
    },
];

// Blogs detailed data
export interface BlogSection {
    type: 'text' | 'heading' | 'subheading' | 'quote' | 'image' | 'list';
    content?: string;
    src?: string;
    alt?: string;
    caption?: string;
    items?: string[];
}

export interface Blog {
    id: number;
    title: string;
    author: string;
    date: string;
    category: string;
    image: string;
    sections: BlogSection[];
}

export interface BlogData {
    [key: number]: Blog;
}

export const blogData: BlogData = {
    1: {
        id: 1,
        title: "A Letter To My Smartphone!",
        author: "Wesley D'Souza",
        date: "Mar 14, 2020",
        category: "2020",
        image: "/yourhour-website-img/yourhourapp_Letter-To-Device_gap.webp",
        sections: [
            {
                type: "text",
                content:
                    "Dear Device,\n\nOf all the people I could write to, tonight I choose to write to you. This is not a love letter, but always remember that I have a lot of love for you. It's just that, at some point, your love turns toxic. Sorry.",
            },
            {
                type: "text",
                content:
                    "I remember the day you arrived home. I remember unpacking you, chucking aside the warranty information papers, the user guide, and all unnecessary other paraphernalia. I remember how I ran into my garden and started to snap away at the various flowers that grew there- all to test the camera. It was beautiful. I did not know how many flowers were there until that day in the garden. You brought them to my attention.",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhourapp_Texting-With-Colleague-Smartphone_gap.webp",
                alt: "Phone addiction illustration",
            },
            {
                type: "text",
                content:
                    "Then the day a horrible accident befell the both of us. A prankster cousin pushed us into the swimming pool. And the dive that we went for, was your last. After that, you were never the same. And yet, the efforts to resuscitate you were long-drawn. Many remedies were tried and tested. To no avail.",
            },
            {
                type: "text",
                content:
                    "In the dark night, with you not there to keep me company, I began to think about how my life had revolved around you. Far more than is acceptable. That I would treat you better than I was treating most humans! Unthinkable. And yet. Here we are.",
            },
            {
                type: "text",
                content:
                    "And so, tonight, I’, breaking up with you. No, not entirely. I can never do without you. But I’ve decided to keep my distance. I have learnt my lesson well. Perhaps, one day, I shall truly be done with you. One day, I shall wash my hands of you.",
            },
        ],
    },

    2: {
        id: 2,
        title: "Phone Addiction",
        author: "Wesley D'Souza",
        date: "April 16, 2020",
        category: "2020",
        image: "/yourhour-website-img/yourhourapp_Friends-social-media_gap.webp",
        sections: [
            {
                type: "text",
                content:
                    "In the world as we know it today, technology plats a very significant role. It has enabled us to scale great heights, achieve our goals, make advances in medical science. Truly, the pros of modern technology are innumerable. Technology has made itself so indispensable to us, that it has permeated very sphere of our lives.",
            },
            {
                type: "text",
                content:
                    "While this is not entirely bad, the dependence we have on technology can be crippling in its absence. The problem of cell phone overuse, attracted the attention of various agencies who sought to study the matter more minutely. They decided that this smartphone dependence is a form of psychological or behavioural dependence associated with the smartphone.",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhourapp_Girl-using-charging-smartphone_gap.webp",
                alt: "Young people using phones",
            },
            {
                type: "quote",
                content:
                    "It is an addiction,that has gone right to the heart of our society. This addiction has had an adverse effect on human communication which is odd, because the phone made the world a smaller place and made it easier to reach people in the first place! It is a constant complaint of parents that their children don’t look up from their phones and do not participate in dinner table conversations",
            },
            {
                type: "text",
                content:
                    "We now have the world at our fingertips. Information from all over pouring in at lightning speed that leaves us reeling. There is a barrage of knowledge that assaults our senses and very often, this information can be overwhelming. Many psychologists have reported cases of cell phone induced anxiety, stress, and depression.",
            },
            {
                type: "text",
                content:
                    "One of the things that is often overlooked while talking about cell phone addiction is the bad effect that it can have on our productivity levels. Humans have a tendency to put off for later many things that need their immediate attention. This behaviour is called procrastination and all of us have been guilty of it at least once in our lives. This adversely affects our ability to be more enthusiastic about our professional lives. When work is assigned, employees should get to it more readily, with due diligence,",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhourapp_friends-studying-technology_gap.webp",
                alt: "Child using phone while charging",
            },
            {
                type: "text",
                content:
                    "But instead, managers complain of the fact that their employees are jumping to their phones every time it beeps. People are so attached to their phones that they check their phones when they feel the slightest vibration. Sometimes they are alerted by phantom or ghost vibrations which occur when they are waiting for a call or text, or just generally waiting for some kind of feedback.",
            },
            {
                type: "text",
                content:
                    "Where youngsters are supposed to do their schoolwork and build good communication skills, we see their eyes glued to their phone screens. When they need to make social relationships, they would prefer to stay at home or within the bounds of a Wi-Fi connection. Ignoring their work, throwing tantrums when they are denied a phone, has far reaching effects that may manifest itself as a bleak future. But technology as we have said, has helped us a great deal. For example, it is because of the internet that you are reading this article, probably on your cell phone.",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhourapp_Time-and-work-productivity_gap.webp",
                alt: "Group of teenagers using devices",
            },
            {
                type: "text",
                content:
                    "Disconnected from our present reality, we have become over connected to a virtual reality. We care about what strangers on the internet think about our lifestyles, and tailor our social media handles to configure to their expectations. We seem to be losing sight of what is truly important in our lives.",
            },
            {
                type: "text",
                content:
                    "As a people, we need to seriously reconsider our lifestyles. But more than that, we need to relearn how to prioritise our lives. Critical things need to be dealt with before we can spend our leisure time on other things. The ability to organise and prioritise, which seems to be in shortage today, needs to be cultivated once more among us in order to have better, richer lives.",
            },
        ],
    },

    3: {
        id: 3,
        title: "The Great Covid Realisation!",
        author: "Wesley D'Souza",
        date: "May 18, 2020",
        category: "2020",
        image: "/yourhour-website-img/yourhourapp_The-Great-Realisation_gap.webp",
        sections: [
            {
                type: "text",
                content:
                    "The dawn of the quarantine era that arose in the wake of destruction left by the coronavirus has spawned an ocean of articles containing some variation of the phrase “in these trying times”. And though this article, too, shall use this phrase at some point (time really does turn phrases into clichés) we must begin to pay attention to the many wonderful things that have also been happening quietly, but surely. One of them happens to be a popular spoken-word poem that is doing the rounds of the internet. And in times where we might seem to let things go out of focus, it serves as an optimistic reminder that we are both- problem and solution.",
            },
            {
                type: "text",
                content:
                    "The poem called The Great Realisation by @probablytomfoolery on Instagram is the one I am referring to. Disguised as a bed-time tale for children, the poet himself speaks the poem in a soft and kind voice. There is a feeling of calm that washes over you while you listen to the story of a species that is narrated stanza by insightful stanza.",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhourapp_Happy-Relationship_gap.webp",
                alt: "Young people using phones",
            },
            {
                type: "quote",
                content:
                    "Of all the things that stays with me even now, something that is as striking as it is confounding is the near debilitating control that technology has over us. While conversations and arguments rage over various social media and in the comments sections of different sites, we may have let our conversations with people in real time fade away, let away into background noise. As Tom would say- it's not that nothing’s being said, it’s that the meaning of our words is being watered down. Ironically, I need technology to write this piece and bring it to you. But let’s not dwell on that. To those of us who have it, let us be grateful for every little distraction that takes our fraying niceness away from the bursting point and towards something productive.",
            },
            {
                type: "text",
                content:
                    "It truly is wonderful that people are using this time to rebuild the relationships that they’d let crumble in the hustle and bustle of daily life. Many I know are rejoicing that they get to see more of their parents or children. Amidst the volume of baking and cooking and home workout videos that seem to be pouring in over the internet we see a lot of smiles, a lot of laughter. senses and very often, this information can be overwhelming. Many psychologists have reported cases of cell phone induced anxiety, stress, and depression.",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhourapp_Humanity_gap.webp",
                alt: "Child using phone while charging",
            },
            {
                type: "text",
                content:
                    "But indeed, being, for all intents and purposes, trapped, really shows us how grateful we ought to be for all that is available to us. But this gratefulness I accept with a great guilt; all the things that we can be grateful for should serve as reminders to us of the unimaginable privilege that we are a product of. In a country where people are walking many hundreds of miles to get back home, I am grateful that I already have a home. For every morsel that I can eat, there are people who make a meal once in two days. And yet my dwindling belief in the goodness of humanity does not die; there are people out there who are taking care of each other. NGO’s and other private institutions have started charities that are working over-time, all hours of the day and night to get essentials to those that are truly vulnerable, while also being exposed to great risk themselves.",
            },
            {
                type: "text",
                content:
                    "A great many have poured in the thought that a lot of lessons are there to be learnt of this pandemic. The time of subtle hints has passed; this disease has, as has been pointed out, exposed an already broken system. The days of subtle allusions to the vices that grip our world have faded and great facades have been torn down to expose the inherent greed that has a choke hold on the world. We see it now, and all its enablers clear as day. But these lessons are for those who have the time to educate themselves. For others, it is water over an upturned pot.",
            },
        ],
    },

    4: {
        id: 4,
        title: "Mindfulness and Productivity!",
        author: "Wesley D'Souza",
        date: "June 21, 2020",
        category: "2020",
        image: "/yourhour-website-img/yourhourapp_multitude-of-options_gap.webp",
        sections: [
            {
                type: "text",
                content:
                    "The esteemed poet, Robert Frost, once wrote, “two roads divulged in a yellow wood…” he was talking, centuries ago, of how we have to make choices everyday of our lives. Today, however, we know that there are not merely two roads; there is a multitude of options and paths available to us. This creates a paradox of choices which in turn leads to us spending an inordinate amount of time trying to decode what our next move ought to be. We often catch ourselves thinking about our family, work, hobbies, dinner, all in the same line of thought. And if you’re not an experienced multitasker, chances are you will be quite worn out by the end of the day.",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhourapp_meditation_gap.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "text",
                content:
                    "But, not to worry, we have a solution. Indeed, this one has been around for quite some time. But before I introduce to you this solution, I ask you to indulge me. Spiritual gurus and meditation experts have always asked their pupils to choose. Choose what they give their attention to. Of course, they talk in terms of theological beliefs. But it can be extended to our world as well. Yes, there is a world of choices to us. In fact, not making a choice is also a choice, as frustrating as that is. But keep in mind that yes, you can filter what you wish to let in.",
            },
            {
                type: "quote",
                content:
                    "In the world that we live, there is an insurmountable amount of energy that pours in from various sources- the internet, newspapers, whatsapp groups- you name it. But what if I said that there is a way to not let all of this information overwhelm you?",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhourapp_qualitatively-productive_gap.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "text",
                content:
                    "The solution we are talking about is Mindfulness. To put it simply, it is the conscious practice of the mind in choosing to focus on one task at a time. and it is a tool that comes in handy when we have a lot of tasks, but we want our output to not just be about quantity, but also about good quality. William James, the father of modern psychology, termed it as “the faculty of voluntarily bringing back a wandering attention, over and over again.” Our minds are often like rebellious children- doing what they are told to abstain from. And it is our job to bring it in line. This can only be done with practice and patience.",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhourapp_Inner-Peace_gap.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "text",
                content:
                    "There are many ways to build a mindful approach to work. One of the most popular is meditation. In this from of meditation, we focus on our breathing. Breathing becomes the sole, most important activity in that time. But as we pay attention to the inhalation and exhalation of breath from our body, we find that our elbow itches, our neighbour plays music while she gardens, three cars drove by in the space of this minute. Then you suddenly remember that you’re supposed to pay attention to your breathing exercises. This happens in cycles and becomes, what we call Mindfulness. In time, you will find that your attention wanders less and less, and that the proverbial itch, has faded away. The best way to achieve Mindfulness is, and I believe Wendell Berry said it best, “Make a place to sit down. Sit down. Be quiet.",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhourapp_MultiTasking_gap.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "text",
                content:
                    "There are many benefits to Mindfulness. For one, we become qualitatively productive. The only thing than getting the job done, is getting the job done well. That way, you satisfy your boss, and very importantly, you reassure yourself that you are capable of doing your work very well. This in turn becomes a strong motivator for you to perform well on future tasks. We live in a world that strongly in multitasking. But we should also keep in mind that multitasking is not for everyone; it is known that when asked to multitask, employees perform worse, while also decreasing memory and delivering a massive hit to our general wellbeing.",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhourapp_Stress-Release_gap.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "text",
                content:
                    "Another benefit of practicing mindfulness is that it can greatly reduce the stress caused by eliminating the need to expend crucial energies on making choices. By thinking of one thing at a time, we arrive at decisions much faster without much furrowing of the brow. We find that we are able to prioritise with greater ease, thus allowing us to complete tasks that demand our attention at once. Our tendency to procrastinate is also done away with.",
            },
            {
                type: "text",
                content:
                    "The best thing about this is that we don’t need any special instruments for it. It’s like a gym workout , minus the heavy lifting. The only thing you need is to sit down, breathe, focus, and become mindful",
            },
        ],
    },

    5: {
        id: 5,
        title:
            "A Review of Colson Whitehead’s Pulitzer Prize-winning novel ‘Nickel Boys’!",
        author: "Wesley D'Souza",
        date: "July 01, 2020",
        category: "2020",
        image: "/yourhour-website-img/yourhourapp_Nickel-Boys_gap.webp",
        sections: [
            {
                type: "text",
                content:
                    "Make a career of humanity,” this is what a two-time Pulitzer winner urges us to do today. In the world in which we live there is no dearth of divisive obstacles. The human mind has categorised and compartmentalized what is up for perception; in its extremes, this categorization has led to some of the most oppressive and exploitative systems of governance. In uncertain times like the one in which we live turn to the voices we trust the most to make sense for us out of the chaos that pervades our world.",
            },
            {
                type: "text",
                content:
                    "When reading The Nickel Boys, a novel set in 1960’s Florida one is brought face-to-face with the grotesque reality of racism and segregation. Elwood Curtis, an ambitious young man, is all set to apply to a local black college, when one tiny, innocent mistake derails his plans for the future and lands him in a correctional facility that promises to make an honest man out of him. But the nightmarish reality of it is that any one who would dare to stand up in the face of a corrupt and degenerate institution would ‘disappear’. An ideal young man- beloved to family, adored by his teachers, thought of in amiable terms by the rest of his peers, Elwood Curtis finds himself, to use the old adage, in the wrong place at the wrong time. One simple actgets him thrown into an institution that treats its inmates with a severe hand; the facadd of z correctional facility is a barely and ill maintained one.",
            },
            {
                type: "quote",
                content:
                    "In clear, eloquent prose, Colson Whitehead presents to us a canvas on which is painted a very difficult painting. Difficult, because of its subject matter. Segregation and racism which was woven into the very fabric of America and other colonies created a breeding ground for contempt and hatred of a single community based on the colour of one's skin. Perhaps it was the freakish nature of the violence that lent itself to the drestruction of a single community that prompts Whitehead to avoid fantastical labnguage; the problems themselves read like something that one could only have imagined. But this was the clear and present reality. The story that we have to stare in the eye is a terrifying one. One inwardly flinches at the clear and brutal descriptions that find themselves into the story.",
            },
            {
                type: "text",
                content:
                    "One finds themselves growing quite fond of the characters that Whitehead moulds with his words. Their develpoment is steady. The book itself is emotive and you are exposed to the emotions of the characters. At some point their emotions become your own. On the other hand you come to despise the other malevolent characters and everything they stand for.",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhourapp_racism-and-segregation_gap.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "text",
                content:
                    "Books like The Nickel Boys are important when we stand more in danger of repeating history by forgetting it. But now, having brought our attention to it, the book also sensitizes us towards the problems of a communtiy as if they were our own.",
            },
            {
                type: "text",
                content:
                    "The Nickel Boys won the Pulitzer Prize for fiction 2020. This is Colson Whitehead’s secind Pulitzer, the first being for The Uderground Railroad.",
            },
        ],
    },

    6: {
        id: 6,
        title: "Procrastination and Ways to Overcome It!",
        author: "Daksh Haldar",
        date: "June 30, 2019",
        category: "2019",
        image: "/yourhour-website-img/yourhourapp_procastination_gap.webp",
        sections: [
            {
                type: "text",
                content:
                    "Here you are again. Reading an article on how to avoid procrastinating when you probably have a dozen tasks that are calling for your attention. You are the proverbial college student- you have a test to study for, a research paper to submit, and yet, the most interesting thing to you is how you’ve not cleaned your room in ages! And so, off you go on a cleaning spree around your house, cleaning up your desk, tucking away the bed corners, rearranging your bookshelf alphabetically, and sorting out your wardrobe. Then, having exhausted your physical and mental capacities for the day, you have no motivation to contribute towards the completion of your more pressing tasks. You put them off for yet another day.",
            },
            {
                type: "text",
                content:
                    "But what if I told you that you are not alone in this? That there are a billion others (at least) who are doing the same thing as you- procrastinating. You see, procrastination is one of those universal maladies that impedes the forward progression of professional life and everyone experiences it some time or the other. As James Suroweicki wrote in The New Yorker, “surveys show that the vast majority of college students procrastinate, and articles in the literature of procrastination often allude to the author’s own problems with finishing the piece. (This piece will be no exception.)”",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhourapp_Pleasure-for-small-time_gap.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "quote",
                content:
                    "But such is the lure of procrastination. We find that what assails our ability to do work is the fact that small distractions give us short bursts of quick pleasure. Completing that article that you’re supposed to write might give you a sense of accomplishment in the end, but in the present moment what is most alluring is being able to browse social media or take up a DIY art project. Humans are largely motivated by the proximity of the reward; the further away a reward is, the more you disregard its value. Behavioural psychologists have called this Hyperbolic discounting. When faced with having to choose between a Hundred Dollars given today or a hundred and ten dollars tomorrow, people often pick the hundred dollars today. But say you extend the condition: a hundred dollars a month from now or a hundred dollars a month and a day from now- people choose the latter. Most people are, as the adage goes, “penny wise, pound foolish”.",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhourapp_push-away-work_gap.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "text",
                content:
                    "People procrastinate for lots of different reasons. Often trapped in a repetitive cycle, they tend to push the work away, then lose motivation, when the deadline draws nearer, they work for longer under more stress, love faith in their work, then tend to procrastinate further. The fear of failure is another cause for people to procrastinate, and so is perfectionism. “This is the perplexing things about procrastination,” says Suroweicki, “although it seems to involve avoiding unpleasant tasks, indulging in it generally doesn’t make people happy.”",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhourapp_looking-for-solution_gap.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "text",
                content:
                    "As easy as it is to make intelligent witticisms about it, the fact remains that procrastination is a problem that propels many individuals to look for a solution, lest it become unmanageable. In fact, that is probably why you are here. Many solutions exist for the same. When talking about writers and artists, one often heard excuse is writers block. This is just another way of saying “I don’t want to do it right now.” But the solution only comes when you get down to sitting and write. Productivity workshops always echo the mantra that Nike immortalised, “Just Do It”. As Picasso once said, “to know what you’re going to draw, you have to begin drawing.”",
            },
            {
                type: "text",
                content:
                    "Procrastination often arises from a muddy thought process. When you don’t know where you’re going, you do not know what path to take to get there. And if you manage to start with your work, you often don’t know where it is going to end. Visualising the end of your work will come in handy here. If you can, draft an outline, frame a timetable, walk your mind through the procedure that you will need to follow to achieve your goals.",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhourapp_TimeTable_gap.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "text",
                content:
                    "Another effective measure that many productivity enhancers are using is the pomodoro technique. What you do here is you work in short bursts of twenty-five minutes, and then give yourself reward plus a five-minute break. You do this while gradually increasing the amount of time you spend working, until you’re working seamlessly.",
            },
            {
                type: "text",
                content:
                    "You must also keep in mind to do away with other distractions. It is essential that you work from an environment that does not make demands that would in turn lead to you underperforming. Therefore, keep away all gadgets that are not absolutely essential. All other sources of information that are not directly related to work must also be done away with. This includes games, newspapers, and so on. If you feel the pull of these distractions is too strong, you may always put obstacles in the path of you getting access to these distractions. This may range from keeping the distracting objects in a different room, to having them locked away for the duration of the work time.",
            },
            {
                type: "text",
                content:
                    "The problem of procrastination is an eternal one, faced by lay people as well as Nobel prize winners. That is not to say that it is insurmountable. It is only with practice that this can be controlled and it is crucial that we learn to do so. Because, as Annie Dillard says, “ho we spend our days is, of course, how we spend our lives.”",
            },
        ],
    },

    7: {
        id: 7,
        title: "Three Ways to Manage Your Time",
        author: "Daksh Haldar",
        date: "May 14, 2019",
        category: "2019",
        image: "/yourhour-website-img/yourhourapp_Ways-To-Manage-Your-Time_gap.webp",
        sections: [
            {
                type: "text",
                content:
                    "In a world that is obssessed with getting things done, the focus has shifted from having qualitative output to a quantitative one. This massive paradigm shift in career related areas makes a lot of people feel conflicted about the way they see their work. For those that had their hearts set on a certain career, the need for passion is fast becoming redundant, with productivity taking center stage. The world is a lovely place to be, I'm sure, but what do we say to those who feel disillusioned and yet hope to find meaning in their work? There are answers galore, and with strategies presenting themselves at every bend in the road we embarked on a quest to pen down the most effective strategies.",
            },
            {
                type: "text",
                content:
                    "And so the call for time management has echoed like a battle cry across the world. With organisations lobbying for better or reduced work hours, better working conditions, more efficient tools to work with, it seems like time management is the only viable solution to getting things done. And though there is no dearth of strategies to manage your time, we have shortlisted four of the best ways to manage time.",
            },
            {
                type: "heading",
                content: "Make a Timetable!",
            },
            {
                type: "quote",
                content:
                    "One of the chief methods of time management suggested everywhere is one that has been reiterated from our school days, the easiest of them all, and perhaps, therefore, easily ignored. It is a timetable. Our teachers always tell us this when our exams approach so that we don'tfind ourselved pulling all-nighters. But unfortunately, the time it takes to sit down and draw up a schedule makes us procrastinate and further delay this task. In the end, it is yet another task that bites the dust. But people have found that dividing up their day into smaller bite-size work intervals has helped them get through major portions of their work. I think it plays on the psychology of the human mind. With the completion of a task, the mind releases a dose of dopamine to propel us and make us happy. This works in much the same way; when you get through one work interval successfully, you want to do more.",
            },
            {
                type: "text",
                content:
                    "But remember that timetables often turn mundane. The way to get over this is by a crafty use of breaks in your schedule. The Pomodoro Technique, which employs a strategically placed break at the end of a short work cycle, helps the mind focus and breathe.",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhourapp_TimeTable _gap.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "heading",
                content:
                    "Remember to prioritise! It's important to know what you're giving your time to!",
            },
            {
                type: "heading",
                content: "Using To-Do Lists!",
            },
            {
                type: "text",
                content:
                    "Making and following a to-do list not only furthers our attempt to complete our work, but also brings into focus the tasks that are waiting our attention. When we have penned down our tasks, it becomes that much simpler to set a time limit to each task, while also making the process of prioritization better and simpler. To-do lists are an efficientway to handle the tasks that need completion",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhourapp_To-Do-List_gap.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "heading",
                content: "To-dos are good for you!",
            },
            {
                type: "heading",
                content: "Cut Out The Noise and Distractions!",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhourapp_Distraction_gap.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "heading",
                content:
                    "The secret to increase productivity is to manage your time well!",
            },
            {
                type: "text",
                content:
                    "And here we don'tmean just the noise of traffic on the road or in the hallway. It'sall kinds of traffic from the internal to the external. Do away with distractions that impede your progress. This means, muting that annoying family group, and all other things that are not work related. You must concentrate on work during work hours if you want to get stuff done. If, like the rest of us, you too are working from home, keep in mind to carve out a space for yourself. Read about how to work from home here.",
            },
            {
                type: "text",
                content:
                    "While a distraction now and then is a good thing, it proves to be a hindrance to completing work on time. Therefore, all social obligations are to be slotted into your schedule when you feel you’ve completetd a satisfactory amount of work.",
            },
            {
                type: "text",
                content:
                    "The worlds markets are an increasingly competitive place. Thus, one must always remember to work smarter, instead of harder. Time and energy efficient ways are the key to getting work done. “We live in a culture obssessed with personal productivity. We devour books on getting things done and dream of four-hour workweeks,” says Adam Grant. He believes that we must also change the way in which we think. He suggests attention management. This way you focus on things as and when they come to you and focus on getting them done.",
            },
        ],
    },

    8: {
        id: 8,
        title: "The Office Away From Office",
        author: "Daksh Haldar",
        date: "June 16, 2019",
        category: "2019",
        image:
            "/yourhour-website-img/yourhourapp_work-from-home-and-office_gap.webp",
        sections: [
            {
                type: "text",
                content:
                    "Companies, in the face of this global pandemic, have asked their employees to Work From Home. While these measures are aimed at staunching the spread of the coronavirus, the work does not stop. This, however, seems to be easier said than done. Chances are, if you’re not a freelancer or a WFH veteran, that you find the environment not conducive to work. It is important that you establish certain things in order to be more productive. And, even though we cannot go on living as if nothing’s wrong, we need to put out the work our employers expect from us. Here are a few tips on how to be a good employee and not lose your work ethic while working from home.",
            },
            {
                type: "text",
                content:
                    "And so the call for time management has echoed like a battle cry across the world. With organisations lobbying for better or reduced work hours, better working conditions, more efficient tools to work with, it seems like time management is the only viable solution to getting things done. And though there is no dearth of strategies to manage your time, we have shortlisted four of the best ways to manage time.",
            },
            {
                type: "heading",
                content: "Work Area!",
            },
            {
                type: "quote",
                content:
                    "The atmosphere of a home and an office are very different. To that end, one feels that a corner of your home can be converted into a workspace of sorts. It is crucial that you have a desk where you have all the things that you need. Try to limit the number of times that you get up from your desk to go fetch implements that you need. Which leads us to our next point:",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhourapp_Productivity_gap.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "heading",
                content:
                    "It is important to create a healthy working environment while working from home!",
            },
            {
                type: "heading",
                content: "Block Distractions!",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhourapp_TimeTable _gap.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "text",
                content:
                    "As at the office, it is important to create an environment that does not provide easy distractions. So, get away from it all. Try to do away with all the noise of the household as daily life unravels around you as you try to work. Remember: noise is sound that comes at irregular intervals and disturbs us. But if your one of those people who need at least some sort of noise, try to have a dull sound playing in the background. White noise, research has suggested, is conducive to a work environment. It is also important that you establish ground rules with your family or people that you live with. Try to have them treat the situation as if you are really working at the office. Do not get pulled into family drama, or household chores. Dedicate the time to your work. Similarly, try to finish your tasks by the deadline. It is not fair either to you, or your loved ones, that you take your work to the dinner table, which would mean that you have neither proper family time, nor proper work time. a clear distinction of the two will let you have the best of both worlds.",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhourapp_Distraction-free-work-environment_gap.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "heading",
                content:
                    "Work life encroaching on family time? Remember to create a separation between the two for the best of both worlds!",
            },
            {
                type: "heading",
                content: "Get Organized!",
            },
            {
                type: "text",
                content:
                    "It would do you a lot of good to make a list of all the things that you would need while working from home and keeping them within easy reach. Try to think of all the things that are on your desk at your office, and bring all of them together at your home office.",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhourapp_Panning-Schedule_gap.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "heading",
                content:
                    "Remember to plan your day’s work so that you meet all the goals that you set!",
            },
            {
                type: "heading",
                content: "Communicate!",
            },
            {
                type: "text",
                content:
                    "When working from home it is crucial to keep in mind that you won’t have your colleagues around to ask them about things all the time. In this respect, it would do a lot of good to first establish what work needs to get done by the end of the day. a call with your employer or your project partner will help you to outline the tasks that need to be dealt with by the end of the day.",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhourapp_work from-home_gap.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "heading",
                content:
                    "As always, communication is key. Make sure your workmates are on the same page as you!",
            },
            {
                type: "heading",
                content: "Take Breaks!",
            },
            {
                type: "text",
                content:
                    "Research has suggested that when one works in breaks of 25-30 minutes, and then take a break for 5 minutes, work flow becomes smoother, and the employee-more productive. It is not good for the body to remain, neck-bent over a screen and chained to desk without relief. Once in a while, it is important to get up from your desk and take a walk, use the restroom, and listen to something more soothing than your work.",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhourapp_Take -small-breaks _gap.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "heading",
                content: "And when it all gets too much, remember to take a break!",
            },
            {
                type: "text",
                content:
                    "During these times, it is very easy to shrug-off work. Since there is no authority that is constantly overlooking the work you’re doing, it is infinitely easier to say that you’ll do it later. Since you’re essentially in charge of yourself, it is imperative that you take responsibility and do the desired work. Home environments do not easily lend itself to work, and these are but a few things that one could do to work easily from home.",
            },
        ],
    },

    9: {
        id: 9,
        title: `The Difference between "AVERAGE AND SUCCESS"`,
        author: "Daksh Haldar",
        date: "June 16, 2019",
        category: "2019",
        image: "/yourhour-website-img/Youhour_app_Top.webp",
        sections: [
            {
                type: "text",
                content:
                    "The amount of free time, we as humans have now was never the same as before. As primal beings, we used to spend our whole life looking for ways to survive and to keep us and our community safe.",
            },
            {
                type: "text",
                content:
                    "But now, life has become much easier to survive and everything is ready-to-make, we have lots of time and many ways to entertain ourselves and engage ourselves in meaningless activities.The world is at your fingertips",
            },
            {
                type: "text",
                content:
                    "Even the food is delivered to our premises making us more sedentary and less mobile. We are all living vegetables.Even the food is delivered to our premises making us more sedentary and less mobile. We are all living vegetables.",
            },
            {
                type: "heading",
                content: "Make a Timetable!",
            },
            {
                type: "quote",
                content:
                    "We just choose to fill the voids with crappy stuffs like aimlessly scrolling through social media, or doing meetings where isn’t necessary, talking aimlessly to unnecessary people when you have better things to do.",
            },
            {
                type: "text",
                content:
                    "I believe, the only difference between someone stuck and someone making it big is the way he uses his time.Here are some of the ways with which you can get a hold of your free time to be more happy and fulfilled",
            },
            {
                type: "image",
                src: "/yourhour-website-img/Youhour_app_A_Man.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "heading",
                content: "A Man who Lifts Twice, stays Healthy, Wealthy and Wise!",
            },
            {
                type: "heading",
                content: "Meditate:",
            },
            {
                type: "text",
                content:
                    "If there is only one keystone habit you want to concentrate on and acquire, then I will highly recommend practicing meditation even for as little as 10 minutes a day.",
            },
            {
                type: "text",
                content:
                    "It will make you live in present which is going to bring happiness to you which is the end goal for most of us. It also helps is focusing more on your goals and jitters away distracting habits eventually.",
            },
            {
                type: "heading",
                content: "Exercise:",
            },
            {
                type: "text",
                content:
                    "Age old saying-‘Health is Wealth’. And trust me, it is. It is one of the most important things in the long run. You can work 16-18 hours a day and make your business prosper in 2 years, but soon you are going to be a prey to many diseases.",
            },
            {
                type: "text",
                content:
                    "Then you won’t be able to work even for 2 hours a day. Who is going to manage your business then.Keep a check on your health.",
            },
            {
                type: "text",
                content: "Exercising everyday has a number of benefits including:",
            },
            {
                type: "list",
                items: [
                    "More energy throughout the day.",
                    "Better physique.",
                    "Increased Happiness.",
                    "Increased Happiness.r.",
                ],
            },
            {
                type: "text",
                content: "And Many More.",
            },
            {
                type: "image",
                src: "/yourhour-website-img/Yourhour_app_Aim.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "heading",
                content: "Aim for the Moon, You may hit the star!",
            },
            {
                type: "heading",
                content: "Starting a Side Business:",
            },
            {
                type: "text",
                content:
                    "Starting a business has never been easier than it is after the advent of the Internet. You can write blogs, start your instagram page or even a youtube channel. There are many more options to choose from. It may take time but it is going to be a hit as there is an audience for everyone these days. You just need to pick your niche and go hard on it. It will soon start making you money and might overtake your salary if you stick long enough with it.",
            },
            {
                type: "heading",
                content: "Reading Books:",
            },
            {
                type: "text",
                content:
                    "Another activity/habit specially recommended by most of the great minds of any generation.As we graduate, most of us give up on learning which is one reason most of us aren’t able to improve much.Books are available on every topic, from currently hot Artificial Intelligence to age old Mediation, from cooking to farming, from money management, home science, from animal rearing to parenthood.You don’t need to get a degree to learn all of this. Nor do you need to pay tuition fees for learning. It is all available in the books.Just grab one which is the most intriguing to you or the one you need the most.",
            },
            {
                type: "image",
                src: "/yourhour-website-img/Yourhour_app_Don't.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "heading",
                content: "Don't wait for things to settle down. Do it now!",
            },
            {
                type: "heading",
                content: "Learn a new Skill:",
            },
            {
                type: "text",
                content:
                    "Be it learning to play guitar, taking a calligraphy class, taking a cake making class, or even a knitting class, learn a new language, or do something you would like to do. You might have given up on a passion of yours in your school days for studying or some other reason. It is the time to work on it. It is time to try it out. Don’t miss out on it.",
            },
            {
                type: "heading",
                content: "Goal Setting:",
            },
            {
                type: "text",
                content:
                    "One of the best things to do in your leisure time is to set and review your goals.It is a great way to reflect on your progress and it keeps you on track with the end goal. You can start by making weekly, monthly, 6-monthly and annual goals.I personally don’t set any goal for more than one year in the future as it is highly unpredictable to assume the life I will be living 1 year from now.",
            },
            {
                type: "heading",
                content: "Cleaning and Organising Your Place:",
            },
            {
                type: "text",
                content:
                    "Coming back to a clean and organised place after a hard day at work or at college is such a mesmerising feeling.You can just get into the comfy sheets and relax.Cleaning the place can be a fun habit if you play your favourite songs while doing so.It lowers the stress anxiety and fatigue and also helps you defeat the deadly habit of procrastination.",
            },
            {
                type: "image",
                src: "/yourhour-website-img/Yourhour_app_Start.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "heading",
                content: "Start Now an reap the rewards later!",
            },
            {
                type: "heading",
                content: "Monthly Budget Review",
            },
            {
                type: "text",
                content:
                    "Reviewing your budget if you already have one is a great exercise to save a few hundred bucks.And making a budget in advance creates a psychological barrier which is hard to cross. You will never be in debts. You can also observe and unlearn your bad spending habits.",
            },
            {
                type: "heading",
                content: "Getting Bored:",
            },
            {
                type: "text",
                content:
                    "I tried to make myself clear in the last blog that you can be more creative by getting bored in this ever distracted world.Give it a read if you haven’t already. It will amaze you. It will let you think of your present, past and future, keeping at the core the ways in which you can improve your life.You will start thinking about your choices and how you can better them. This is called Autobiographical thinking explained in the last blog.",
            },
            {
                type: "heading",
                content: "Conclusion:",
            },
            {
                type: "text",
                content:
                    "Now with your time in your hands, explore more to find yourself. Try to find things you like and don’t like. It will be amazing to know that you weren’t doing certain things before which you love to do and you are pretty good at them. If you aren’t able to free your time, use YourHour application on your Smartphones and go nuts. Learn something new, read something old, explore the unexplored and be more fulfilled. What do you people do in your leisure hours? Comment down to tell us. Maybe we can share it with others. Keep sticking with us. Until the next read, See ya!",
            },
        ],
    },

    10: {
        id: 10,
        title: `"YOUNG V/S THE OLD!" Smart Phones Seperating Generations!`,
        author: "Steven Smith",
        date: "September 31, 2020",
        category: "2020",
        image: "/yourhour-website-img/yourhourapp_relationship_gap5_3.webp",
        sections: [
            {
                type: "text",
                content:
                    "Addiction is injurious to health! And while most narcotics damage a person’s Biological wellbeing, Smart Phones attack, point blank to one’s Social wellbeing. But isn’t it an irony that the devices meant to connect us with the world, are in fact, responsible for breaking our ties from our closed ones?",
            },
            {
                type: "text",
                content:
                    "Smart phones have always been seen as the WEAPON OF THE YOUTH, but is it only the young minds being trapped in this dungeon or are the adults the actual ringmasters! Do the youth exploit themselves on their own or are they just the path followers? Are they the assailant or are they the real victims? This drug has influenced the young and the old alike!",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhourapp_young_and_old_alike.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "heading",
                content: "Smart Phones have trapped the YOUNG and the OLD alike!",
            },
            {
                type: "quote",
                content:
                    "In my past blogs I have described what phone addiction is like and how a person slowly becomes an addict to their phones. And this time you are going to be the jury and judge for yourself whether, your Relationship with your phone is affecting your REAL-LIFE BONDS?",
            },

            {
                type: "heading",
                content: "Teenage: The Age of the Lost!",
            },
            {
                type: "text",
                content:
                    "Almost a majority of mobile phone users are teenagers. And as a proven fact they all waste a huge amount of their productive time on a list of useless activities. And hitting the top rank in that list is their cell phone with the added blessing of low rate internet facilities!",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhourapp_teenager_the_lost_age.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "heading",
                content: "Teenage is the time to build- either CAREER or ADDICTION!",
            },
            {
                type: "text",
                content:
                    "The favourite pass time of any teenager is to browse through their phones. Staring down at the posts, comparing stuffs, snapchatting each other, waking up early in the morning just to maintain their streaks…. The list goes on and on and on. They prefer to ignore than being ignored and so they pretend to be busy whenever they are alone. They love to tag their friends on memes but remain unaware of their surroundings. They do listen to people around but it’s just like a music system surround! And this incomplete attention leads to reduced retention!",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhourapp_teenage_phone_addiction.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "heading",
                content:
                    "Maybe we have failed as humans to develop connections. athst's why our generations depend for it on PHONES!",
            },
            {
                type: "text",
                content:
                    "A cherry to the top, these pass times get converted into more dangerous obsessions like nomophobia or fear of being phoneless! Also, visualising life through social media often lets depression crawl in. And this mental stress usually gets reflected upon family. They are the ones who eventually face our ignorance, our involvement in our own world makes us detached from them, and it definitely affects the closeness of our relationships. We are all busy people and with growing aspects of life one hardly is able to find quality time anyways. And this engrossment into a virtual world makes us fall behind in our real lives!",
            },
            {
                type: "heading",
                content: "Parents: The Path Leaders!",
            },
            {
                type: "text",
                content:
                    "If it were a time 10 years before, we might have overlooked the fact that our parents too are mobile phone addicts. But today, with the young generation getting all tech savvy, how could their parents lag behind in the race?",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhourapp_parents_becoming_phone_addicts.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "heading",
                content:
                    "What more a child need from their parents than their TIME and ATTENTION?",
            },
            {
                type: "text",
                content:
                    "The modern age parents are more addicted to their phones then their children. There was a time when the entire family used to gather in the living area and together watch their favourite shows on the television. But now the entire family does gather but to use their phones together. With all the attractive apps and easy to use interfaces, it is more interesting and exciting for our parents to indulge and enjoy these rare treasures.",
            },
            {
                type: "text",
                content:
                    "This has caused a greater addiction amongst the adult generation than the teenagers. We can see ample cases of technoference- an interference by technology! Parents tend to have a greater relationship with their friends on social media than their own child. e child might be needing company but who can be heard over the earphones? This has developed a great communication gap amongst the generations and paved the way for the child to feeling lonely, unheard and left out. Ultimately, these insecurities result in children finding adverse ways to fill in the gaps, becoming either drug addicts or worse- Phone Addicts!",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhourapp_growing_digital_gap.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "heading",
                content:
                    "Alas! Phones have suceeded in building gaps in relationship rather than bridging them!",
            },
            {
                type: "text",
                content: `For this generations and the ones to come, these gadgets would always continue to create a SOCIAL DIVIDE amongst families. We have all lost our quality times with friends and family to these devices, which have cast a strong spell on us. And it would be not so far a day when "FAMILIES" would be strangers living under the same roof!`,
            },
            {
                type: "text",
                content:
                    "It is need of the hour to have some handy help to get rid of this addiction and YourHour App is that perfect solution. With exciting features to help you keep Your Time in Your Hand, the YourHour app is a complete digital solution for detoxification of your phone addiction. Let's take our steps towards being SMART USERS of our phones and not just owners of SMART PHONES!",
            },
        ],
    },

    11: {
        id: 11,
        title: `"MOBILE ADDICTION" - The Show Behind!`,
        author: "Steven Smith",
        date: "September 31, 2020",
        category: "2020",
        image: "/yourhour-website-img/yourhour_app_stages_header.webp",
        sections: [
            {
                type: "text",
                content:
                    "It is often said, “Change is the inevitable truth”. Things change, situations change and people change. It spares no one. And this change never happens overnight. Like one day you suddenly wake up and, hola! You are a changed being! No that happens only on telenovelas. But in real life, all changes have a long end process behind them.",
            },
            {
                type: "text",
                content:
                    "And so is the process of being a Cell Phone Addict! We all have this general idea of what “addiction to phone” means, but how do we know we are an addict? When do we realise that? Does a fairy come down all the way from heaven and speak the magic words to us? Or is there a whole lot of show going on behind the veil, which we need to understand?",
            },
            {
                type: "image",
                src: "/yourhour-website-img/YourHour_app_NewDrug.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "heading",
                content: "Phone Addiction, the DRAIN of BRAIN!",
            },
            {
                type: "quote",
                content:
                    "In my last blog, we discussed upon Phone Addiction – the new Drug! And in this one we would focus on the mechanism of becoming a phone addict. Addiction, like any other process, occurs in stages. And like any other drug, mobile phone addicts too pass through all of these. So, let’s start!",
            },
            {
                type: "heading",
                content: "Stage 1: CRAVER",
            },
            {
                type: "text",
                content:
                    "Craving means to long for something and that’s what a craver does. This is the start flag to the addiction process. Once you clear this check post, you are in a greater mess. This is the point where everything seems normal. You are still a normal user and are able to effortlessly manage your life and your phone in a balanced way. But slowly you crave. You want more of your phone, everywhere. You miss it. You regret leaving it at home. You find it more interesting than get-togethers and even shopping! You crave for it like a small child craving for a toy! Buddy, believe me, if you fall for this there is no turning back!",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhour_app_image1.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "heading",
                content: "Stage 2: HABITUAL",
            },
            {
                type: "text",
                content:
                    "Habit. A very deadly word if you have a ‘bad’ one. The most interesting thing about habits is that good ones, take a long time to cultivate but these evil, nasty ones, are so damn fast! And so is ‘mobile addiction’. You won’t realize when it happened, but your cravings slowly form a habit. Your ‘want’ for the phone now becomes your ‘need’, your craving turns into something you do on a regular basis. You wake up and check your phone and sleep after kissing it goodnight. Just like you brush, bathe, eat and sleep, your phone too, becomes your routine! And as said ‘Habits Die Hard!’",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhour_app_habitual.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "heading",
                content:
                    "This little BUDDY has become a part of your routine affecting your ACTUAL ROUTINE!",
            },
            {
                type: "heading",
                content: "Stage 3: DEPENDENT",
            },
            {
                type: "text",
                content:
                    "The venom now starts to show its colors. Slowly you become dependent on your phone. You cannot do a thing without it. Whether you want to talk, play or read your first choice is your phone. This little poison becomes your best pal. You chose its company even at meals, in the washroom, at movies or tours! It is like a doorway for you, out of your life. A window from where you helplessly just stare at the moments slip by!",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhour_app_dependent2.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "heading",
                content: "The VENOM of DEPENDENCY starts flowing through your veins!",
            },
            {
                type: "heading",
                content: "Stage 4: OBSESSED",
            },
            {
                type: "text",
                content:
                    "Now you actually start enjoying this dependency. In fact, you become greatly obsessed with your device. It becomes so hard to even keep it down. You go on doing your stuff in it, without blinking an eye. And I mean it, literally. You forget to blink. You forget to eat. You are removed from your daily life processes. You lose productivity. You lose the will to do new things, try new stuff. All you want is your phone. All you find interesting is your phone. Although you won’t do any real work. You would just scroll down the feeds, or watch movies and videos, or play games, or stare at dresses you don’t even want to purchase! But it’s always you and your phone!",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhour_app_image_obsessed.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "heading",
                content:
                    "Your OBSESSION with your phone makes you do INSANE things, even if it involves HURTING your own self!",
            },
            {
                type: "heading",
                content: "Stage 5: ADDICTED",
            },
            {
                type: "text",
                content:
                    "What could be next? A stage where all is blur……where you are just a puppet not knowing what went wrong. You now have a sense that your phone has been a devil in disguise all this while, but even then you are unable to give up on it. You want a break-up, but your mind is all consumed in your cell phone to be ready do it. And here is when my friend you realize, YOU HAVE BECOME A PHONE ADDICT!",
            },
            {
                type: "image",
                src: "/yourhour-website-img/yourhour_app_image_addicted2.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "heading",
                content: "And sadly your PHONE is your BOSS and YOU are the SLAVE!",
            },
            {
                type: "text",
                content:
                    "All these stages are hairline apart. And maybe you identify yourself with more than one stage at a time. Maybe you are at the transition between two stages. Maybe you are at the last stage, or maybe you have just started on the path to Addiction! But my friend, you need to acknowledge this and accept this ASAP! Or else the return is going to be tough.",
            },
            {
                type: "text",
                content:
                    "Being this said, I would love to recommend you an amazingly useful app that would help you know exactly, at which stage you are and help you get out of it in a fun and easy way. No app blocks, no alarms, and buzzers. This app is just that FRIEND, which would be there with you and guide you until you are finally detoxed! It is the YourHour App – placing Your Time in Your Hand! Try it out, it really works!",
            },
            {
                type: "text",
                content:
                    "With more exciting features coming across to help you keep Your Time in Your Hand, the YourHour app is a complete digital solution for detoxification of your phone addiction. Let's take our steps towards being SMART USERS of our phones and not just owners of SMART PHONES!",
            },
        ],
    },

    12: {
        id: 12,
        title: '"BOREDOM = CREATIVITY" The Art Of Doing Nothing!',
        author: "Steven Smith",
        date: "September 31, 2020",
        category: "2020",
        image: "/yourhour-website-img/YourHour_app_Boredom_Top.webp",
        sections: [
            {
                type: "text",
                content:
                    "Do you remember doing nothing since the advent of Smartphones. I don’t. And doing nothing include staring at a wall, or the clock, or anything which requires minimum brain effort use for an elongated period.",
            },
            {
                type: "text",
                content:
                    "Through Smartphones, you can talk to anyone anytime and from anywhere, can order food online, can book a cab, can learn something online yet there are two faces of a coin and we now need to understand about the dark side of these ‘smartphones’ to use them in the most productive way.",
            },
            {
                type: "image",
                src: "/yourhour-website-img/YourHour_app_Bordom1.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "heading",
                content: "Altruistic Efforts through the act of Blood Donation!",
            },
            {
                type: "quote",
                content:
                    "Mobile phones are a great facilitator in this era but they also have a downside which lately has been in the limelight. One important downside being that we have forgotten getting bored. We have made it our habit to get a constant stimulus from swiping and scrolling the feeds and just going from one post to another and then one app to another. How is it degrading our creativity will be answered in this blog post.",
            },
            {
                type: "heading",
                content: "What is Boredom?",
            },
            {
                type: "text",
                content: "Things which promote boredom:",
            },
            {
                type: "list",
                items: [
                    "Walking on the same path",
                    "Doing laundry",
                    "Cooking the same food often",
                    "Writing the same thing repeatedly",
                    "Writing the same thing repeatedly",
                ],
            },
            {
                type: "text",
                content: `The list is endless. Google -‘Getting bored the right way’`,
            },
            {
                type: "image",
                src: "/yourhour-website-img/YourHour_app_Boredom2.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "heading",
                content:
                    "In the absence of any Fun thing, kids invent their own fun with creative thinking",
            },
            {
                type: "heading",
                content: "How is Smartphone a Roadblock in our creativity?",
            },
            {
                type: "text",
                content:
                    "It is our primal habit to keep our brain active. From the days of the earliest humans ,this trait is observed as they always used to look for ways to survive by looking for prey and predators. We get very uncomfortable when we are not using our brains too much and this trait has been leveraged by engineers of the different social-media platforms to increase traffic.",
            },
            {
                type: "text",
                content:
                    "This primal instinct of shifting our focus is helpful to social-media apps as they keep on engaging us with new content to focus on and we keep on shifting our focus making it a hard habit to move away from..",
            },
            {
                type: "text",
                content:
                    "Neuroscientists throughout the world condemn multi-tasking. What people think is that while multitasking, they are doing multiple things at once. But in reality, they are just rapidly shifting their focus from one place to another and depleting their neuro-resources, which is not available in abundance, by-the-way.",
            },
            {
                type: "image",
                src: "/yourhour-website-img/YourHour_app_Boredom_last.webp",
                alt: "Meditation at sunset",
            },
            {
                type: "heading",
                content: "This is what Autobiographical thinking must look like",
            },
            {
                type: "text",
                content:
                    "According to one study, our attention span at work has depleted by about 4 times in the last one decade. Now, don’t panic. The harsh truth has been spoken and now is the time to bring back the creativity but:",
            },
            {
                type: "text",
                content:
                    "Then you won’t be able to work even for 2 hours a day. Who is going to manage your business then.Keep a check on your health.",
            },
            {
                type: "text",
                content: "Exercising everyday has a number of benefits including:",
            },
            {
                type: "heading",
                content: "How can boredom bring back Creativity?",
            },
            {
                type: "text",
                content:
                    "Even though, this state of boredom is agonising, it has its own benefits like our mind looks for ways to concentrate on things which are easily available.",
            },
            {
                type: "text",
                content:
                    "In an experiment, people were divided into two groups. Group A was asked to copy the entries from a phonebook onto a page.",
            },
            {
                type: "text",
                content:
                    "Group B wasn’t given any task. After this boring task, members of both the groups were asked to give ideas as to what can be done with cups. In any situation, The people of Group A performed much better and gave more ideas than Group B.!",
            },
            {
                type: "text",
                content:
                    "Boredom researcher Dr Sandi Mann says, “Once you start daydreaming and allow your mind to really wander, you start thinking a little bit beyond the conscious, little bit into the subconscious which allows, sort of, different connections to take place.”",
            },
            {
                type: "text",
                content:
                    "Basically, doing mundane tasks makes our mind wander and switch into its ‘Default Mode Network’.",
            },
            {
                type: "heading",
                content: "Default Mode:",
            },
            {
                type: "text",
                content:
                    "It is the state of our mind when we think about things without actually being intentional of the subject on which we are pondering. While in this default mode, our brain basically performs these tasks:",
            },
            {
                type: "heading",
                content: "1. Autobiographical Thinking",
            },
            {
                type: "heading",
                content: "1. Starting a Side Business:",
            },
            {
                type: "text",
                content:
                    "While our mind is in this default mode, we usually get the time to think about what we are doing,how we are doing, how can we improve our efficiency, and even of our goals and the ways to achieve them. This is important as we start thinking of how long life is and we understand how doing things with micro results in focus is not worth it and the effect of others opinions on our results fade away.",
            },
            {
                type: "heading",
                content: "2. Altruistic and Prosocial efforts:",
            },
            {
                type: "text",
                content:
                    "It is doing things for the society while being selfless. In a way, even hurting yourself to be good towards the society becomes an option. Blood donation is a prime example. Most people who donate blood are away from the Smartphones. And since they don’t have anything better to do, the idea of donating blood takes over. Charity also works the same way.",
            },
            {
                type: "heading",
                content: "3. Fresh Ideas:",
            },
            {
                type: "text",
                content: `Adrian Savage, an editor at the online life coach site, www.lifehack.org. states, "Boredom is nearly always essential to creativity. It isn't true that creativity is mostly sparked by having a specific problem to be solved. It's far more likely to arise because the person is bored with the way something has been done a thousand times before and wants to try something new. Boredom stimulates the search for better ways to do things like nothing else does." That Million dollar idea which you haven’t received from the Divine source yet is waiting for you to get bored. Try it for a Million dollars, people.`,
            },
            {
                type: "heading",
                content: "Get Bored To Make Decisions:",
            },
            {
                type: "text",
                content:
                    "When we are bored, we tend to wander in our thoughts, towards the things our mind thinks are important. If you have had a bad fight with your girlfriend and it is in the back of the mind then when you are bored, like while going to bed, your brain starts to focus on what to do in this relationship. Whether you want to be with your significant other or not (bonus tip: pick this one). How you can improve your emotional spillage? And it even helps us to make decisions relating to our job, career, kids, food, movies etc. It makes us think intensely on important things. When we get bored, we do the real thinking. We doubt our decisions and it is very important as most of our decisions are bad. Really Bad.",
            },
            {
                type: "heading",
                content: "Conclusion:",
            },
            {
                type: "text",
                content:
                    "Now that we have already bought ourselves time by using YourHour application, why not use it judiciously to get bored?",
            },
            {
                type: "text",
                content:
                    "Smartphones have decreased our creativity as we are spending more time scrolling through feed than we spend getting bored and, maybe, we need to look back and relax a bit and start watching the clock tick for an hour. And if someone asks you, “What are you doing?’, you can say, “I am getting bored.”, and share this article with them.",
            },
            {
                type: "text",
                content:
                    "When was the last time you were bored? Comment down below.Till the next blog. Enjoy your Time. Cheers!",
            },
        ],
    },
}; 