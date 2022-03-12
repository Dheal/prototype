import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const NewPdfViewer = ({ latestResult, height }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div style={{ height: 900 }}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
        <Viewer
          fileUrl={latestResult?.latest_pdf}
          plugins={[defaultLayoutPluginInstance]}
        ></Viewer>
      </Worker>
    </div>
  );
};

export default NewPdfViewer;
