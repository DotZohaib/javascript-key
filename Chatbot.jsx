'use client';

import { useState } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: "Hi! How can I assist you?", sender: "bot" }]);
  const [userInput, setUserInput] = useState('');

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (!userInput) return;

    const newMessages = [...messages, { text: userInput, sender: "user" }];
    setMessages(newMessages);

    const botResponse = await fetchBotResponse(userInput);
    setMessages([...newMessages, { text: botResponse, sender: "bot" }]);
    setUserInput('');
  };

  const fetchBotResponse = async (input) => {
    const lowerInput = input.toLowerCase();

    // Define keyword mappings
    const responses = [
      { keywords: ['name'], answer: "I'm Zohaib Ali." },
      { keywords: ['do', 'work'], answer: "I am a Full Stack Developer specializing in MERN Stack." },
      { keywords: ['experience', 'years'], answer: "I have several years of experience in web development and IT." },
      { keywords: ['technologies', 'use'], answer: "I work with React.js, Next.js, Node.js, Express, MongoDB, and Tailwind CSS." },
      { keywords: ['skills'], answer: "My skills include web development, AI, machine learning, and cyber security." },
      { keywords: ['food', 'favorite'], answer: "I love Biryani!" },
      { keywords: ['ai', 'artificial intelligence'], answer: "I'm passionate about AI, particularly in natural language processing (NLP), machine learning (ML), and deep learning (DL)." },
      { keywords: ['projects', 'work'], answer: "I've worked on e-commerce websites, AI chatbots, machine learning models, and portfolio sites." },
      { keywords: ['contact', 'reach'], answer: "You can contact me via email at Zuhaibalid@gmail.com." },
      { keywords: ['website'], answer: "My website is [www.CodeWithZohaib.com](https://www.CodeWithZohaib.com)." },
      { keywords: ['hiring'], answer: "Feel free to contact me through my website or email to discuss availability." },
      { keywords: ['programming', 'language'], answer: "I enjoy working with JavaScript, Python, and R, especially for data science and AI." },
      { keywords: ['schedule', 'availability'], answer: "You can check my availability by contacting me via email or through my website." },
      { keywords: ['expertise', 'web development'], answer: "I have expertise in front-end and back-end development, with a focus on security and performance." },
      { keywords: ['services'], answer: "I offer full-stack web development, AI/ML solutions, and digital marketing services." },
      { keywords: ['passion'], answer: "I’m passionate about web development, machine learning, and AI." },
      { keywords: ['cloud', 'computing'], answer: "Cloud computing allows remote servers to store, manage, and process data over the internet." },
      { keywords: ['ml', 'machine learning'], answer: "Machine Learning (ML) is a branch of AI that enables computers to learn from data and improve over time without being explicitly programmed." },
      { keywords: ['dl', 'deep learning'], answer: "Deep Learning (DL) is a subset of ML that uses neural networks with many layers to model complex patterns in data." },
      { keywords: ['nlp'], answer: "Natural Language Processing (NLP) focuses on the interaction between computers and humans through natural language, enabling machines to understand, interpret, and generate human language." },
      { keywords: ['security', 'web security'], answer: "Web security involves protecting websites from attacks, unauthorized access, and vulnerabilities." },
      { keywords: ['optimize', 'performance'], answer: "I optimize websites through performance tuning, minimizing load times, and ensuring a smooth user experience." },
      { keywords: ['motivates'], answer: "I’m motivated by solving challenging problems and delivering quality results." },
      { keywords: ['challenges', 'in', 'development'], answer: "Challenges in development often lead to valuable learning experiences." },
      { keywords: ['maintaining', 'quality'], answer: "I focus on maintaining quality throughout the development process." },
      { keywords: ['time', 'management', 'techniques'], answer: "I use techniques like the Pomodoro Technique to manage my time." },
      { keywords: ['goals', 'for', 'next', 'year'], answer: "My goals for next year include expanding my skills in AI, machine learning, and cloud computing." },
      { keywords: ['learning', 'from', 'mistakes'], answer: "I believe in learning from my mistakes to grow as a developer." },
      { keywords: ['approach', 'to', 'design'], answer: "I take a user-centered approach to design." },
      { keywords: ['continuous', 'learning'], answer: "I engage in continuous learning to stay updated with the latest technologies." },
      { keywords: ['balancing', 'work', 'and', 'personal', 'life'], answer: "I balance work and personal life by scheduling time for both." },
      { keywords: ['skills', 'to', 'develop'], answer: "I am looking to develop my skills in AI, deep learning, and data science." },
      { keywords: ['collaborative', 'tools'], answer: "I use collaborative tools like GitHub for version control." },
      { keywords: ['importance', 'of', 'communication'], answer: "Communication is key to successful teamwork." },
      { keywords: ['code', 'review', 'process'], answer: "I participate in code reviews to learn from others and improve my coding." },
      { keywords: ['work', 'philosophy'], answer: "My work philosophy is to always strive for excellence and improvement." },
      { keywords: ['favorite', 'podcast'], answer: "My favorite podcast is about AI, technology trends, and insights." },
      { keywords: ['career', 'advice'], answer: "My best career advice is to find a mentor and learn from their experience." },
      { keywords: ['how', 'to', 'stay', 'focused'], answer: "I stay focused by minimizing distractions and setting clear goals." },
      { keywords: ['creative', 'process'], answer: "My creative process involves brainstorming and prototyping ideas." },
      { keywords: ['learning', 'from', 'others'], answer: "I value learning from others’ experiences and insights." },
      { keywords: ['passion', 'for', 'technology'], answer: "My passion for technology drives my career choices." },
      { keywords: ['what', 'drives', 'you'], answer: "I am driven by the desire to create meaningful and impactful solutions." },
      { keywords: ['dealing', 'with', 'failure'], answer: "I deal with failure by analyzing what went wrong and adjusting my approach." },
      { keywords: ['importance', 'of', 'teamwork'], answer: "Teamwork is essential for achieving complex project goals." },
      { keywords: ['impact', 'of', 'AI'], answer: "I believe AI will significantly impact various industries, including healthcare, finance, and transportation, in the coming years." },
      { keywords: ['how', 'to', 'stay', 'updated'], answer: "I stay updated by following tech news, AI/ML blogs, and attending relevant conferences." },
      { keywords: ['project', 'management', 'tools'], answer: "I use tools like Trello, Asana, and Jira for project management." },
      { keywords: ['ai', 'artificial intelligence'], answer: "I'm passionate about AI, particularly in NLP and deep learning." },
      { keywords: ['projects', 'work'], answer: "I've worked on e-commerce websites, AI chatbots, and portfolio sites." },
      { keywords: ['contact', 'reach'], answer: "You can contact me via email at Zuhaibalid@gmail.com." },
      { keywords: ['website'], answer: "My website is [www.CodeWithZohaib.com](https://www.CodeWithZohaib.com)." },
      { keywords: ['hiring'], answer: "Feel free to contact me through my website or email to discuss availability." },
      { keywords: ['programming', 'language'], answer: "I enjoy working with JavaScript and Python." },
      { keywords: ['schedule', 'availability'], answer: "You can check my availability by contacting me via email or through my website." },
      { keywords: ['expertise', 'web development'], answer: "I have expertise in front-end and back-end development, with a focus on security and performance." },
      { keywords: ['services'], answer: "I offer full-stack web development, AI solutions, and digital marketing services." },
      { keywords: ['passion'], answer: "I’m passionate about web development and AI." },
      { keywords: ['cloud', 'computing'], answer: "Cloud computing allows remote servers to store, manage, and process data over the internet." },
      { keywords: ['nlp'], answer: "NLP stands for Natural Language Processing, focused on human-computer interactions." },
      { keywords: ['security', 'web security'], answer: "Web security involves protecting websites from attacks, unauthorized access, and vulnerabilities." },
      { keywords: ['optimize', 'performance'], answer: "I optimize websites through performance tuning, minimizing load times, and ensuring a smooth user experience." },
      { keywords: ['motivates'], answer: "I’m motivated by solving challenging problems and delivering quality results." },
      { keywords: ['favorite', 'hobby'], answer: "In my free time, I enjoy reading books and exploring new technologies." },
      { keywords: ['learning', 'process'], answer: "I believe in continuous learning and regularly take online courses to improve my skills." },
      { keywords: ['teamwork'], answer: "I value teamwork and collaboration in projects, as it leads to better outcomes." },
      { keywords: ['leadership'], answer: "I enjoy taking the lead on projects and guiding teams towards achieving their goals." },
      { keywords: ['challenges', 'face'], answer: "I face challenges head-on and view them as opportunities for growth." },
      { keywords: ['work', 'ethic'], answer: "I have a strong work ethic and am dedicated to delivering high-quality work." },
      { keywords: ['current', 'projects'], answer: "Currently, I am working on a personal portfolio and several freelance projects." },
      { keywords: ['technology', 'interested'], answer: "I am interested in emerging technologies like blockchain and quantum computing." },
      { keywords: ['code', 'review'], answer: "I believe code reviews are essential for maintaining code quality and team learning." },
      { keywords: ['frameworks', 'used'], answer: "Besides MERN, I also work with Angular and Vue.js for front-end development." },
      { keywords: ['version', 'control'], answer: "I use Git for version control and collaboration on projects." },
      { keywords: ['database', 'experience'], answer: "I have experience working with both SQL and NoSQL databases." },
      { keywords: ['user', 'experience'], answer: "I prioritize user experience in all my projects to ensure usability and accessibility." },
      { keywords: ['testing', 'code'], answer: "I write unit tests to ensure my code is reliable and maintainable." },
      { keywords: ['deploy', 'applications'], answer: "I have experience deploying applications on platforms like Vercel and Heroku." },
      { keywords: ['responsive', 'design'], answer: "I implement responsive design to ensure my applications work on all devices." },
      { keywords: ['web', 'accessibility'], answer: "I follow best practices for web accessibility to make my sites usable for everyone." },
      { keywords: ['community', 'involvement'], answer: "I am active in the developer community and participate in local meetups." },
      { keywords: ['future', 'goals'], answer: "My future goals include expanding my knowledge in AI and contributing to open-source projects." },
      { keywords: ['data', 'science'], answer: "I have a keen interest in data science and analytics." },
      { keywords: ['machine', 'learning'], answer: "I explore machine learning techniques to enhance applications." },
      { keywords: ['test', 'driven', 'development'], answer: "I practice test-driven development to create robust applications." },
      { keywords: ['collaboration'], answer: "I enjoy collaborating with designers to create visually appealing applications." },
      { keywords: ['freelance'], answer: "I take on freelance projects to diversify my experience and income." },
      { keywords: ['design', 'principles'], answer: "I follow design principles like alignment, contrast, and repetition for better UI." },
      { keywords: ['best', 'practices'], answer: "I adhere to best practices in coding, such as writing clean and maintainable code." },
      { keywords: ['automation'], answer: "I automate repetitive tasks to increase efficiency in my workflow." },
      { keywords: ['community', 'contributions'], answer: "I contribute to open-source projects and help other developers." },
      { keywords: ['tools', 'use'], answer: "I use tools like Figma for design and Postman for API testing." },
      { keywords: ['frameworks', 'preferences'], answer: "I prefer React for front-end development due to its flexibility." },
      { keywords: ['motivational', 'quote'], answer: "I believe in the quote: 'Success is not the key to happiness. Happiness is the key to success.'" },
      { keywords: ['time', 'management'], answer: "I prioritize tasks and set deadlines to manage my time effectively." },
      { keywords: ['work', 'balance'], answer: "I strive to maintain a healthy work-life balance." },
      { keywords: ['goal', 'setting'], answer: "I set SMART goals to track my progress." },
      { keywords: ['portfolio', 'importance'], answer: "A portfolio showcases my skills and projects to potential employers." },
      { keywords: ['mentorship'], answer: "I value mentorship and seek guidance from experienced professionals." },
      { keywords: ['networking'], answer: "I actively network to expand my connections in the industry." },
      { keywords: ['innovation'], answer: "I embrace innovation and explore new ideas in my projects." },
      { keywords: ['future', 'trends'], answer: "I keep an eye on future trends in technology to stay ahead." },
      { keywords: ['code', 'quality'], answer: "I prioritize code quality by following coding standards." },
      { keywords: ['feedback'], answer: "I welcome feedback to improve my work." },
      { keywords: ['research'], answer: "I conduct research to stay updated on industry developments." },
      { keywords: ['documentation'], answer: "I document my projects for better understanding and collaboration." },
      { keywords: ['technical', 'writing'], answer: "I enjoy technical writing and share my knowledge through articles." },
      { keywords: ['virtual', 'events'], answer: "I participate in virtual events and webinars to learn and network." },
      { keywords: ['workshops'], answer: "I attend workshops to enhance my skills." },
      { keywords: ['team', 'collaboration'], answer: "I believe teamwork leads to better results." },
      { keywords: ['conflict', 'resolution'], answer: "I approach conflicts calmly and seek mutual understanding." },
      { keywords: ['code', 'optimization'], answer: "I optimize code for better performance and readability." },
      { keywords: ['application', 'security'], answer: "I implement security best practices in applications." },
      { keywords: ['data', 'protection'], answer: "I take data protection seriously and follow regulations." },
      { keywords: ['user', 'feedback'], answer: "I use user feedback to improve applications." },
      { keywords: ['agile', 'methodologies'], answer: "I am familiar with Agile methodologies for project management." },
      { keywords: ['scrum'], answer: "I have experience working in Scrum teams." },
      { keywords: ['project', 'management'], answer: "I use tools like Trello and Asana for project management." },
      { keywords: ['client', 'communication'], answer: "I maintain clear communication with clients throughout projects." },
      { keywords: ['design', 'process'], answer: "I follow a structured design process to ensure project success." },
      { keywords: ['software', 'lifecycle'], answer: "I understand the software development lifecycle (SDLC) and its phases." },
      { keywords: ['problem', 'solving'], answer: "I excel in problem-solving and critical thinking." },
      { keywords: ['adaptability'], answer: "I adapt quickly to new tools and technologies." },
      { keywords: ['entrepreneurship'], answer: "I have an interest in entrepreneurship and startup culture." },
      { keywords: ['skills', 'development'], answer: "I invest time in developing new skills to stay competitive." },
      { keywords: ['success', 'definition'], answer: "Success is achieving personal and professional goals." },
      { keywords: ['client', 'satisfaction'], answer: "Client satisfaction is my top priority." },
      { keywords: ['future', 'aspirations'], answer: "I aspire to lead a development team in the future." },
      { keywords: ['life', 'goals'], answer: "My life goals include continuous learning and making a positive impact." },
      { keywords: ['career', 'path'], answer: "I envision a successful career in tech with leadership roles." },
      { keywords: ['philosophy'], answer: "My philosophy is to always strive for excellence." },
      { keywords: ['why', 'developer'], answer: "I became a developer because I enjoy solving problems and creating innovative solutions." },
      { keywords: ['work', 'motivation'], answer: "I am motivated by the impact my work can have on users and businesses." },
      { keywords: ['favorite', 'language'], answer: "My favorite programming language is JavaScript due to its versatility." },
      { keywords: ['software', 'interests'], answer: "I am interested in software development methodologies and best practices." },
      { keywords: ['front-end', 'technologies'], answer: "I work with HTML, CSS, and JavaScript for front-end development." },
      { keywords: ['back-end', 'technologies'], answer: "For back-end development, I primarily use Node.js and Express." },
      { keywords: ['responsive', 'web', 'design'], answer: "Responsive web design ensures my applications look good on all devices." },
      { keywords: ['favorite', 'project'], answer: "My favorite project was building an AI chatbot for a client." },
      { keywords: ['learning', 'resources'], answer: "I use online platforms like Coursera and Udemy for learning new skills." },
      { keywords: ['coding', 'challenges'], answer: "I enjoy taking on coding challenges to improve my problem-solving skills." },
      { keywords: ['latest', 'technologies'], answer: "I keep updated with the latest technologies by following industry blogs." },
      { keywords: ['collaboration', 'tools'], answer: "I use Slack and Microsoft Teams for team collaboration." },
      { keywords: ['user', 'testing'], answer: "User testing helps me gather feedback on my applications." },
      { keywords: ['tech', 'community'], answer: "I actively engage with the tech community through forums and meetups." },
      { keywords: ['personal', 'projects'], answer: "I have several personal projects that I work on during my free time." },
      { keywords: ['favorite', 'framework'], answer: "My favorite framework is React because of its component-based architecture." },
      { keywords: ['biggest', 'inspiration'], answer: "My biggest inspiration is seeing the positive impact of technology on society." },
      { keywords: ['career', 'development'], answer: "I focus on continuous career development through learning and networking." },
      { keywords: ['favorite', 'book'], answer: "My favorite book is 'Clean Code' by Robert C. Martin." },
      { keywords: ['importance', 'mentorship'], answer: "Mentorship is important for personal and professional growth." },
      { keywords: ['future', 'tech', 'interests'], answer: "I am particularly interested in the future of AI and automation." },
      { keywords: ['problem', 'solving', 'skills'], answer: "I continuously work on improving my problem-solving skills." },
      { keywords: ['software', 'architecture'], answer: "I study software architecture to design scalable applications." },
      { keywords: ['network', 'security'], answer: "I understand the basics of network security to protect applications." },
      { keywords: ['cloud', 'technologies'], answer: "I am learning about cloud technologies like AWS and Azure." },
      { keywords: ['interview', 'preparation'], answer: "I prepare for interviews by practicing common coding challenges." },
      { keywords: ['team', 'building'], answer: "I enjoy team-building activities that foster collaboration." },
      { keywords: ['experience', 'learning'], answer: "I believe real-world experience is the best way to learn." },
      { keywords: ['advice', 'new', 'developers'], answer: "My advice for new developers is to never stop learning and practicing." },
      { keywords: ['favorite', 'tool'], answer: "My favorite tool for coding is Visual Studio Code." },
      { keywords: ['maintain', 'work-life', 'balance'], answer: "I maintain work-life balance by setting clear boundaries." },
      { keywords: ['biggest', 'challenge'], answer: "My biggest challenge was learning how to effectively manage time in projects." },
      { keywords: ['software', 'lifecycle', 'phases'], answer: "I understand the phases of the software development lifecycle." },
      { keywords: ['collaborative', 'environment'], answer: "I thrive in collaborative environments where ideas can flow freely." },
      { keywords: ['remote', 'work'], answer: "I have experience working remotely and enjoy the flexibility it offers." },
      { keywords: ['technology', 'trends'], answer: "I stay updated on technology trends by reading articles and attending webinars." },
      { keywords: ['testing', 'importance'], answer: "Testing is crucial for delivering reliable and bug-free applications." },
      { keywords: ['biggest', 'achievement'], answer: "My biggest achievement was launching a successful e-commerce platform." },
      { keywords: ['strategies', 'project', 'management'], answer: "I use Agile strategies for effective project management." },
      { keywords: ['passion', 'development'], answer: "My passion for development drives me to create innovative solutions." },
      { keywords: ['coding', 'practices'], answer: "I follow best coding practices to write maintainable code." },
      { keywords: ['user', 'feedback', 'importance'], answer: "User feedback is vital for improving user experience." },
      { keywords: ['biggest', 'lessons'], answer: "My biggest lessons come from failures and mistakes." },
      { keywords: ['adapting', 'to', 'change'], answer: "I adapt quickly to changes in technology and project requirements." },
      { keywords: ['code', 'refactoring'], answer: "I regularly refactor my code to improve its structure and performance." },
      { keywords: ['learning', 'by', 'doing'], answer: "I believe in learning by doing and building real projects." },
      { keywords: ['staying', 'motivated'], answer: "I stay motivated by setting personal goals and celebrating achievements." },
      { keywords: ['impact', 'of', 'technology'], answer: "I am fascinated by the impact of technology on everyday life." },
      { keywords: ['project', 'collaboration'], answer: "I collaborate with designers and developers for project success." },
      { keywords: ['data', 'analytics'], answer: "I use data analytics to make informed decisions in projects." },
      { keywords: ['security', 'best', 'practices'], answer: "I implement security best practices in all my applications." },
      { keywords: ['future', 'of', 'work'], answer: "I believe the future of work will be heavily influenced by technology." },
      { keywords: ['importance', 'of', 'testing'], answer: "Testing is crucial to ensure application functionality and user satisfaction." },
      { keywords: ['challenges', 'in', 'development'], answer: "Challenges in development often lead to valuable learning experiences." },
      { keywords: ['maintaining', 'quality'], answer: "I focus on maintaining quality throughout the development process." },
      { keywords: ['time', 'management', 'techniques'], answer: "I use techniques like the Pomodoro Technique to manage my time." },
      { keywords: ['goals', 'for', 'next', 'year'], answer: "My goals for next year include expanding my skills in AI and cloud computing." },
      { keywords: ['learning', 'from', 'mistakes'], answer: "I believe in learning from my mistakes to grow as a developer." },
      { keywords: ['approach', 'to', 'design'], answer: "I take a user-centered approach to design." },
      { keywords: ['continuous', 'learning'], answer: "I engage in continuous learning to stay updated with the latest technologies." },
      { keywords: ['balancing', 'work', 'and', 'personal', 'life'], answer: "I balance work and personal life by scheduling time for both." },
      { keywords: ['skills', 'to', 'develop'], answer: "I am looking to develop my skills in AI and data science." },
      { keywords: ['collaborative', 'tools'], answer: "I use collaborative tools like GitHub for version control." },
      { keywords: ['importance', 'of', 'communication'], answer: "Communication is key to successful teamwork." },
      { keywords: ['code', 'review', 'process'], answer: "I participate in code reviews to learn from others and improve my coding." },
      { keywords: ['work', 'philosophy'], answer: "My work philosophy is to always strive for excellence and improvement." },
      { keywords: ['favorite', 'podcast'], answer: "My favorite podcast is about technology trends and insights." },
      { keywords: ['career', 'advice'], answer: "My best career advice is to find a mentor and learn from their experience." },
      { keywords: ['how', 'to', 'stay', 'focused'], answer: "I stay focused by minimizing distractions and setting clear goals." },
      { keywords: ['creative', 'process'], answer: "My creative process involves brainstorming and prototyping ideas." },
      { keywords: ['learning', 'from', 'others'], answer: "I value learning from others’ experiences and insights." },
      { keywords: ['passion', 'for', 'technology'], answer: "My passion for technology drives my career choices." },
      { keywords: ['what', 'drives', 'you'], answer: "I am driven by the desire to create meaningful and impactful solutions." },
      { keywords: ['dealing', 'with', 'failure'], answer: "I deal with failure by analyzing what went wrong and adjusting my approach." },
      { keywords: ['importance', 'of', 'teamwork'], answer: "Teamwork is essential for achieving complex project goals." },
      { keywords: ['impact', 'of', 'AI'], answer: "I believe AI will significantly impact various industries in the coming years." },
      { keywords: ['how', 'to', 'stay', 'updated'], answer: "I stay updated by following tech news, blogs, and podcasts." },
      { keywords: ['project', 'management', 'tools'], answer: "I use tools like Trello and Asana for project management." },
      { keywords: ['impact', 'of', 'user', 'experience'], answer: "User experience greatly impacts user satisfaction and retention." },
    
    ];
    
    

   // Check for keywords in user input and provide the corresponding response
   for (let { keywords, answer } of responses) {
    if (keywords.some(keyword => lowerInput.includes(keyword))) {
      return answer;
    }
  }

    // Default response if no keywords match
    return `I'm here to assist! You can ask about my skills, services, or contact information. Feel free to ask anything related to web development, AI, or my experience.`;
  };

  return (
    <div className="fixed bottom-0 right-0 m-4 z-50">
      <button className="bg-blue-500 text-white p-3.5 text-2xl rounded-full shadow-lg" onClick={handleToggle}>
        💬
      </button>

      {isOpen && (
        <div className="bg-white shadow-lg rounded-lg p-4 w-80 h-96 flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-2 my-2 rounded-md ${
                  message.sender === 'bot' ? 'bg-gray-200 text-black' : 'bg-blue-500 text-white self-end'
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="flex">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
              className="border p-2 flex-1 rounded-md"
            />
            <button onClick={handleSendMessage} className="bg-blue-500 text-white p-2 ml-2 rounded-md">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
