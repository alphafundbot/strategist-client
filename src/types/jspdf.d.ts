declare module 'jspdf' {
    interface jsPDFOptions {
      orientation?: 'p' | 'portrait' | 'l' | 'landscape';
      unit?: 'pt' | 'px' | 'in' | 'mm' | 'cm' | 'ex' | 'em' | 'pc';
      format?: string | number[];
      hotfixes?: string[];
      putOnlyUsedFonts?: boolean;
      compress?: boolean;
      precision?: number;
      userUnit?: number;
      encryption?: any;
      margins?: any;
      floatPrecision?: 'smart' | 'fast' | 'slow' | number;
    }
  
    class jsPDF {
      constructor(options?: jsPDFOptions);
      constructor(
        orientation?: 'p' | 'portrait' | 'l' | 'landscape',
        unit?: 'pt' | 'px' | 'in' | 'mm' | 'cm' | 'ex' | 'em' | 'pc',
        format?: string | number[],
        compressPdf?: boolean
      );
  
      text(text: string | string[], x: number, y: number, options?: any, transform?: any): this;
      save(filename?: string, options?: any): this;
      // Add other methods as needed from the jsPDF library
    }
  
    export default jsPDF;
}
