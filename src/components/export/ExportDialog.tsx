import React, { useCallback, useState, memo } from 'react';
import { XIcon } from 'lucide-react';
import { Squad } from '../../contexts/SquadContext';
import { exportAsJson, exportAsText, exportAsPdf, downloadFile, copyToClipboard } from '../../services/ExportService';
interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  squads: Squad[];
}
const ExportDialog: React.FC<ExportDialogProps> = ({
  isOpen,
  onClose,
  squads
}) => {
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null;
  const handleCopy = useCallback(async (format: 'json' | 'text') => {
    const content = format === 'json' ? exportAsJson(squads) : exportAsText(squads);
    await copyToClipboard(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [squads]);
  const handleDownload = useCallback((format: 'json' | 'text') => {
    const content = format === 'json' ? exportAsJson(squads) : exportAsText(squads);
    const type = format === 'json' ? 'application/json' : 'text/plain';
    downloadFile(content, `lw2-squads.${format}`, type);
  }, [squads]);
  const handleExportPdf = useCallback(() => {
    exportAsPdf(squads);
  }, [squads]);
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-400">Export Squads</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded-full">
            <XIcon className="h-5 w-5 text-gray-400" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="font-medium text-blue-300 mb-2">JSON Format</h3>
            <div className="flex space-x-2">
              <button onClick={() => handleCopy('json')} className="px-3 py-2 bg-gray-600 hover:bg-gray-500 rounded-md text-sm">
                Copy to Clipboard
              </button>
              <button onClick={() => handleDownload('json')} className="px-3 py-2 bg-gray-600 hover:bg-gray-500 rounded-md text-sm">
                Download File
              </button>
            </div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="font-medium text-blue-300 mb-2">Text Summary</h3>
            <div className="flex space-x-2">
              <button onClick={() => handleCopy('text')} className="px-3 py-2 bg-gray-600 hover:bg-gray-500 rounded-md text-sm">
                Copy to Clipboard
              </button>
              <button onClick={() => handleDownload('text')} className="px-3 py-2 bg-gray-600 hover:bg-gray-500 rounded-md text-sm">
                Download File
              </button>
            </div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="font-medium text-blue-300 mb-2">PDF Export</h3>
            <button onClick={handleExportPdf} className="px-3 py-2 bg-gray-600 hover:bg-gray-500 rounded-md text-sm">
              Generate PDF
            </button>
          </div>
        </div>
        {copied && <div className="mt-4 p-2 bg-green-900/50 border border-green-700 rounded-md text-green-300 text-sm">
            Copied to clipboard!
          </div>}
      </div>
    </div>;
};
export default memo(ExportDialog);