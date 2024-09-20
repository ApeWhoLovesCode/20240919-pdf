export function downloadFile(blob: any, fileName: string) {
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  // a.style = "display: none";

  a.click();

  // window.URL.revokeObjectURL(url);
  a.remove();
}

export function download(data: any, fileName: string, fileType: string) {
  const blob = new Blob([data], {
    type: fileType,
  });
  downloadFile(blob, fileName);
}
