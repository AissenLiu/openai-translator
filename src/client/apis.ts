export default {
  baseUrl: 'https://api.openai.com',
  endpoints: {
    v1: {
      completions: {
        url: '/v1/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ1c2VyLWNlbnRlciIsImV4cCI6MTcyMzM1NDM3NSwiaWF0IjoxNzE1NTc4Mzc1LCJqdGkiOiJjcDBxYzFxdG5uMHF0MzFuOGpsZyIsInR5cCI6InJlZnJlc2giLCJzdWIiOiJjbXNmZTdnM3IwNzJrNnY2dTh2ZyIsInNwYWNlX2lkIjoiY21zZmU3ZzNyMDcyazZ2NnU4djAiLCJhYnN0cmFjdF91c2VyX2lkIjoiY21zZmU3ZzNyMDcyazZ2NnU4dWcifQ.hV9VWF1Oms-ytgmTlgIORhw2Rg_Kk1NnRWvzQsDSd5BRtTlOkeidvWii3caJuuNu-iJ1ly6sCt9A6CN9TGIJZA',
        },
      },
      chat: {
        completions: {
          url: '/v1/chat/completions',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ1c2VyLWNlbnRlciIsImV4cCI6MTcyMzM1NDM3NSwiaWF0IjoxNzE1NTc4Mzc1LCJqdGkiOiJjcDBxYzFxdG5uMHF0MzFuOGpsZyIsInR5cCI6InJlZnJlc2giLCJzdWIiOiJjbXNmZTdnM3IwNzJrNnY2dTh2ZyIsInNwYWNlX2lkIjoiY21zZmU3ZzNyMDcyazZ2NnU4djAiLCJhYnN0cmFjdF91c2VyX2lkIjoiY21zZmU3ZzNyMDcyazZ2NnU4dWcifQ.hV9VWF1Oms-ytgmTlgIORhw2Rg_Kk1NnRWvzQsDSd5BRtTlOkeidvWii3caJuuNu-iJ1ly6sCt9A6CN9TGIJZA',
          },
        },
      },
    },
  },
};
