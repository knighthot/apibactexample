const { prisma } = require('./src/config/database');

async function checkDuplicates() {
  try {
    // Check CODECO duplicates
    const codecoData = await prisma.codecoService.findMany({
      select: { id: true, ref_number: true }
    });
    
    console.log('Total CODECO records:', codecoData.length);
    
    const codecoRefNumbers = codecoData.map(c => c.ref_number);
    const codecoDuplicates = codecoRefNumbers.filter((item, index) => codecoRefNumbers.indexOf(item) !== index);
    
    if (codecoDuplicates.length > 0) {
      console.log('CODECO Duplicate ref_numbers:', [...new Set(codecoDuplicates)]);
    } else {
      console.log('No CODECO duplicates found');
    }

    // Check COARRI duplicates
    const coarriData = await prisma.coarriService.findMany({
      select: { id: true, ref_number: true }
    });
    
    console.log('Total COARRI records:', coarriData.length);
    
    const coarriRefNumbers = coarriData.map(c => c.ref_number);
    const coarriDuplicates = coarriRefNumbers.filter((item, index) => coarriRefNumbers.indexOf(item) !== index);
    
    if (coarriDuplicates.length > 0) {
      console.log('COARRI Duplicate ref_numbers:', [...new Set(coarriDuplicates)]);
    } else {
      console.log('No COARRI duplicates found');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDuplicates();

