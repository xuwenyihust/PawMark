class SessionModel {
  constructor() {
  }

  static async getSession(basePath = '', notebookPath = '') {
    try {
        const response = await fetch(basePath + '/api/sessions', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const session = await response.json();
        const associatedSession = session.find(session => session.notebook.path === basePath + '/' + notebookPath);
        const kernelId = associatedSession
            .kernel.id;
        return kernelId;
    } catch (error) {
        console.error('Failed to get session:', error);
        return null;
    }
  };

  static async createSession(notebookPath = '') {
    try {
        const response = await fetch("http://localhost:5002/session", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              'notebookPath': notebookPath
          })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // The response will contain the session data
        const session = await response.json();
        console.log('Session created:', session);
        // The kernel ID is in the 'id' property of the 'kernel' object
        const kernelId = session.kernel.id;

        // Return the kernal ID
        return kernelId;
    } catch (error) {
        console.error('Failed to create session:', error);
    }
  };

}

export default SessionModel;