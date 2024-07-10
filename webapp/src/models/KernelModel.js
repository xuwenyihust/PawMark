class KernelModel {
  constructor() {
  }

  static async restartKernel(kernelId = '') {
    try {
        await fetch(`${basePath}/api/kernels/${kernelId}/restart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        let status;
        do {
          const response = await fetch(`${basePath}/api/kernels/${kernelId}`);
          const data = await response.json();
          status = data.execution_state;
          if (status === 'busy') {
            // Wait for a second before checking again
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        } while (status === 'busy');

        console.log('Kernel restart completed');
      } catch (error) {
        console.error('Failed to restart kernel:', error);
      }
  };

}