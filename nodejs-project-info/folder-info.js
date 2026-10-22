let inputPath = process.argv[2];

let folderName;
let folderPath;
let fileCount;
let folderCount;

import("node:path").then((path)=>{
    folderPath = inputPath? path.resolve(inputPath) : process.cwd();
    folderName = path.basename(folderPath);

    return import("node:fs/promises");
}).then(({readdir})=>{
    return readdir(folderPath, {withFileTypes: true});
}).then((entries)=>{
    return getFolderInfo(entries);
}).catch((err)=>{
    console.error(`error: could not read folder: ${folderName}`);
    process.exitCode = 1;
});

const getFolderInfo = (entries)=>{
    if(!entries){
        console.log(`No entries found`);
        // process.exitCode = 1;
    }

    fileCount = entries.filter((entry)=> entry.isFile()).length;
    folderCount = entries.filter((entry)=> entry.isDirectory()).length;

    const info = {
        Folder: folderName,
        Path: folderPath,
        Files: fileCount,
        Folders: folderCount,
    }
    console.log({...info});

    return {...info};
}