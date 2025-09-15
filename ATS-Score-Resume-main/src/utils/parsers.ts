import mammoth from 'mammoth';

export const parseDOCX = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value.trim();
  } catch (error) {
    console.error('Error parsing DOCX:', error);
    throw new Error('Failed to parse DOCX file');
  }
};

export const parseTXT = async (file: File): Promise<string> => {
  try {
    const text = await file.text();
    return text.trim();
  } catch (error) {
    console.error('Error parsing TXT:', error);
    throw new Error('Failed to parse TXT file');
  }
};

export const parseFile = async (file: File): Promise<string> => {
  const fileType = file.type.toLowerCase();
  console.log('Parsing file:', file.name, 'Type:', fileType);
  
  if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return parseDOCX(file);
  } else if (fileType === 'text/plain') {
    return parseTXT(file);
  } else {
    throw new Error('Unsupported file type. Please upload DOCX or TXT files.');
  }
};