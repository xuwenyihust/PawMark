class StringUtils {
  constructor() {
    console.log('StringUtils constructor');
  }

  static isJupyterTable(str) {
    const regex = /\+\-{3,}\+/;
    return regex.test(str);
  }

  static convertJupyterTableToMarkdownTable = (str) => {
    const rows = str.split('\n').filter(row => row.startsWith('|'));
    const markdownRows = rows.map(row => row.split('|').slice(1, -1).join('|'));
    const header = markdownRows.shift();
    let separator = header.replace(/[^|]/g, '-');
    if (!separator.includes('|')) {
      separator = `|${separator}|`;
    }

    const res = [header, separator, ...markdownRows].join('\n');
    return res;
  }
}

export default StringUtils;

