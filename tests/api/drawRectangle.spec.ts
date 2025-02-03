import fs from 'fs/promises';
import { PDFDocument, grayscale } from '../../src/index';

describe(`PDFDocument`, () => {
  it.only(`load() method`, async () => {
    const doc = await PDFDocument.create();
    const page = doc.addPage();
    page.drawText('hello world', { x: 100, y: 100 });
    page.drawRectangle({
      x: 200,
      y: 200,
      width: 100,
      height: 100,
      // rx: 20, ry: 20,
      opacity: 1,
      borderWidth: 1,
      borderColor: grayscale(1),
      color: grayscale(0.5),
      clipSpaces: [
        {
          topLeft: { x: 200, y: 210 },
          topRight: { x: 210, y: 210 },
          bottomLeft: { x: 200, y: 200 },
          bottomRight: { x: 250, y: 200 },
        },
      ],
    });

    const bytes = await doc.save();

    await fs.writeFile(__dirname + '/file.pdf', bytes);
  });
});
