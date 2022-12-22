//https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop
async function printFiles () {
  const files = await getFilePaths();
//use for loop to loop through files list instead of forEach
  for (const file of files) {
    const contents = await fs.readFile(file, 'utf8');
    console.log(contents);
  }
}
