// server/data/answerBank.js

const answerBank = {
  frontend: {
    easy: {
      "What is React and why is it used?": {
        keywords: ["library", "component", "ui", "jsx", "virtual dom", "meta", "facebook", "efficient", "declarative"],
        minGoodScore: 6
      },
      "Difference between props and state in React?": {
        keywords: ["props", "state", "immutable", "mutable", "parent", "child", "read-only", "data"],
        minGoodScore: 7
      },
      "What is JSX in React?": {
        keywords: ["javascript", "xml", "syntax", "html", "transpile", "babel", "expression"],
        minGoodScore: 6
      },
      "Explain useState hook with example.": {
        keywords: ["usestate", "hook", "state", "functional", "re-render", "counter"],
        minGoodScore: 7
      },
      "What are functional components in React?": {
        keywords: ["function", "component", "jsx", "hook", "stateless"],
        minGoodScore: 6
      }
    },
    medium: {
      "Explain Virtual DOM in React.": {
        keywords: ["virtual", "dom", "efficient", "diffing", "reconciliation", "performance"],
        minGoodScore: 7
      },
      "What is useEffect hook and when is it used?": {
        keywords: ["useeffect", "side effect", "lifecycle", "mount", "cleanup"],
        minGoodScore: 7
      },
      "Explain Context API in React.": {
        keywords: ["context", "provider", "consumer", "global", "state"],
        minGoodScore: 7
      }
    },
    hard: {
      "Explain React reconciliation process.": {
        keywords: ["reconciliation", "diffing", "fiber", "virtual dom", "update"],
        minGoodScore: 8
      },
      "Explain React Fiber architecture.": {
        keywords: ["fiber", "reconciliation", "priority", "scheduler", "incremental"],
        minGoodScore: 8
      }
    }
  },

  backend: {
    easy: {
      "What is Node.js?": {
        keywords: ["runtime", "javascript", "server", "v8", "asynchronous", "event-driven", "non-blocking"],
        minGoodScore: 6
      },
      "What is Express.js?": {
        keywords: ["framework", "node", "web", "api", "middleware", "routing", "express"],
        minGoodScore: 6
      },
      "What is middleware in Express?": {
        keywords: ["middleware", "request", "response", "next", "function"],
        minGoodScore: 7
      }
    },
    medium: {
      "Explain JWT authentication.": {
        keywords: ["jwt", "token", "json", "authentication", "authorization", "header", "payload"],
        minGoodScore: 7
      },
      "Difference between SQL and NoSQL databases?": {
        keywords: ["sql", "nosql", "relational", "document", "schema", "mongodb"],
        minGoodScore: 7
      }
    },
    hard: {
      "How does authentication work in backend systems?": {
        keywords: ["authentication", "authorization", "jwt", "session", "oauth", "token"],
        minGoodScore: 8
      }
    }
  },

  fullstack: {
    easy: {
      "What is full stack development?": {
        keywords: ["frontend", "backend", "database", "client", "server", "end-to-end"],
        minGoodScore: 6
      },
      "Difference between frontend and backend?": {
        keywords: ["frontend", "backend", "ui", "server", "client", "database"],
        minGoodScore: 6
      }
    },
    medium: {
      "Explain client-server architecture in detail.": {
        keywords: ["client", "server", "request", "response", "http", "api"],
        minGoodScore: 7
      }
    }
  },

  software: {
    easy: {
      "What is software engineering?": {
        keywords: ["process", "design", "development", "testing", "maintenance", "sdlc"],
        minGoodScore: 5
      },
      "Difference between compiler and interpreter?": {
        keywords: ["compiler", "interpreter", "translate", "execute", "machine code"],
        minGoodScore: 6
      }
    },
    medium: {
      "Explain OOP principles.": {
        keywords: ["encapsulation", "inheritance", "polymorphism", "abstraction"],
        minGoodScore: 7
      }
    }
  }
};

export default answerBank;