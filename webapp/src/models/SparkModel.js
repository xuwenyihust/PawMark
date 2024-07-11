class SparkModel {
  constructor() {
  }

  static isSparkInfo(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    console.log('html:', html);
    console.log('doc:', doc);

    // Check if the HTML includes Spark info
    const sparkInfo = doc.querySelector('h3');
    console.log('sparkInfo:', sparkInfo);
    return sparkInfo && sparkInfo.textContent === 'Spark Session Information';
  }

  static storeSparkInfo() {
    
  }

  static extractSparkAppId(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Find the <p> tag that contains the application id
    const pTags = Array.from(doc.querySelectorAll('p'));
    const appIdTag = pTags.find(p => p.textContent.includes('Application ID:'));
    const applicationId = appIdTag ? appIdTag.textContent.split(': ')[1] : null;

    const sparkUiLink = doc.querySelector('a').href;

    return applicationId;
  }

}

export default SparkModel;


