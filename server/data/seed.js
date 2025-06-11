const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config();

const topics = [
  {
    title: 'JavaScript Fundamentals',
    description: 'Learn the core concepts of JavaScript programming language',
    category: 'Basics',
    learningPoints: [
      'Variables and data types',
      'Operators and expressions',
      'Control flow (if-else, switch)',
      'Loops (for, while, do-while)',
      'Functions and scope',
      'Arrays and objects basics'
    ],
    resources: [
      {
        name: 'MDN - JavaScript Guide',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
        type: 'documentation'
      },
      {
        name: 'JavaScript.info - The Basics',
        url: 'https://javascript.info/first-steps',
        type: 'article'
      }
    ],
    order: 1
  },
  {
    title: 'DOM Manipulation',
    description: 'Learn how to interact with the Document Object Model',
    category: 'DOM',
    learningPoints: [
      'What is the DOM?',
      'Selecting elements',
      'Modifying element content and attributes',
      'Creating and removing elements',
      'Event handling',
      'Event bubbling and delegation'
    ],
    resources: [
      {
        name: 'MDN - Document Object Model',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model',
        type: 'documentation'
      },
      {
        name: 'JavaScript DOM Crash Course',
        url: 'https://www.youtube.com/watch?v=0ik6X4DJKCc',
        type: 'video'
      }
    ],
    order: 2
  },
  {
    title: 'Functions Advanced',
    description: 'Deep dive into JavaScript functions',
    category: 'Advanced',
    learningPoints: [
      'Function expressions vs declarations',
      'Arrow functions',
      'Higher-order functions',
      'Callbacks',
      'Closures',
      'IIFE (Immediately Invoked Function Expressions)'
    ],
    resources: [
      {
        name: 'MDN - Functions',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions',
        type: 'documentation'
      },
      {
        name: 'JavaScript.info - Advanced Functions',
        url: 'https://javascript.info/advanced-functions',
        type: 'article'
      }
    ],
    order: 3
  },
  {
    title: 'Objects and Prototypes',
    description: 'Understanding JavaScript objects, prototypes and inheritance',
    category: 'Advanced',
    learningPoints: [
      'Object creation patterns',
      'Property descriptors',
      'Prototypal inheritance',
      'this keyword and binding',
      'Object methods',
      'ES6 class syntax'
    ],
    resources: [
      {
        name: 'MDN - Object-oriented JavaScript',
        url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects',
        type: 'documentation'
      },
      {
        name: 'JavaScript.info - Objects',
        url: 'https://javascript.info/object',
        type: 'article'
      }
    ],
    order: 4
  },
  {
    title: 'Asynchronous JavaScript',
    description: 'Working with asynchronous operations in JavaScript',
    category: 'Advanced',
    learningPoints: [
      'Understanding synchronous vs asynchronous',
      'Callbacks',
      'Promises',
      'Async/Await',
      'Fetch API',
      'Handling errors in async code'
    ],
    resources: [
      {
        name: 'MDN - Asynchronous JavaScript',
        url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous',
        type: 'documentation'
      },
      {
        name: 'JavaScript.info - Promises, async/await',
        url: 'https://javascript.info/async',
        type: 'article'
      }
    ],
    order: 5
  },
  {
    title: 'ES6+ Features',
    description: 'Modern JavaScript features introduced in ES6 and beyond',
    category: 'ES6+',
    learningPoints: [
      'let and const',
      'Template literals',
      'Destructuring',
      'Spread and rest operators',
      'Default parameters',
      'Modules',
      'Map and Set',
      'Optional chaining and nullish coalescing'
    ],
    resources: [
      {
        name: 'MDN - JavaScript reference',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference',
        type: 'documentation'
      },
      {
        name: 'ES6 Features Overview',
        url: 'https://es6-features.org',
        type: 'documentation'
      }
    ],
    order: 6
  },
  {
    title: 'React Fundamentals',
    description: 'Getting started with React.js',
    category: 'Frameworks',
    learningPoints: [
      'Components and JSX',
      'Props and state',
      'Lifecycle methods',
      'Hooks (useState, useEffect)',
      'Event handling',
      'Conditional rendering',
      'Lists and keys'
    ],
    resources: [
      {
        name: 'React Official Documentation',
        url: 'https://reactjs.org/docs/getting-started.html',
        type: 'documentation'
      },
      {
        name: 'React Tutorial',
        url: 'https://reactjs.org/tutorial/tutorial.html',
        type: 'article'
      }
    ],
    order: 7
  },
  {
    title: 'Testing JavaScript',
    description: 'Learn how to test your JavaScript code',
    category: 'Testing',
    learningPoints: [
      'Testing concepts and terminology',
      'Unit testing with Jest',
      'React testing with React Testing Library',
      'Mocking',
      'Test-driven development (TDD)',
      'Integration tests'
    ],
    resources: [
      {
        name: 'Jest Documentation',
        url: 'https://jestjs.io/docs/getting-started',
        type: 'documentation'
      },
      {
        name: 'Testing JavaScript with Kent C. Dodds',
        url: 'https://testingjavascript.com/',
        type: 'course'
      }
    ],
    order: 8
  },
  {
    title: 'JavaScript Build Tools',
    description: 'Understanding JavaScript tooling ecosystem',
    category: 'Tools',
    learningPoints: [
      'npm and package.json',
      'Webpack basics',
      'Babel',
      'ESLint',
      'Prettier',
      'Build scripts'
    ],
    resources: [
      {
        name: 'npm Documentation',
        url: 'https://docs.npmjs.com/',
        type: 'documentation'
      },
      {
        name: 'Webpack Getting Started',
        url: 'https://webpack.js.org/guides/getting-started/',
        type: 'documentation'
      }
    ],
    order: 9
  },
  {
    title: 'Personal Project',
    description: 'Build a complete JavaScript application',
    category: 'Projects',
    learningPoints: [
      'Planning and requirements gathering',
      'Architecture and design',
      'Implementation',
      'Testing',
      'Deployment',
      'Documentation'
    ],
    resources: [
      {
        name: 'JavaScript Project Ideas',
        url: 'https://github.com/florinpop17/app-ideas',
        type: 'other'
      }
    ],
    order: 10
  }
];

const seedDatabase = async () => {
    try {
      await mongoose.connect(/*process.env.MONGO_URI*/"mongodb://localhost:27017/JSMentor", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      
      console.log('MongoDB Connected...');
      
      // Delete existing topics
      await Topic.deleteMany({});
      console.log('Deleted existing topics');
      
      // Insert new topics
      await Topic.insertMany(topics);
      console.log('Added new topics');
      
      console.log('Database seeded successfully!');
      process.exit(0);
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };
  
  seedDatabase();