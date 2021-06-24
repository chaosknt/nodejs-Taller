function CrearProcesosArchivos() {

    function subirUno(file, path) {

        return new Promise((resolve, reject) => {
                file.mv(path, function(err) {
                  if (err) {
                    reject(err)
                  } 
                  else {
                    console.log(file.name + ' se proceso')
                     resolve(path)
                  }
                })
        });
    }

    return {

        subirTodos: async(reqs, path) => {

            let files = [];

            if (!reqs || Object.keys(reqs).length === 0) {
              return files;
            }
        
            let keys = Object.keys(reqs);
            let sampleFile = reqs[keys[0]];
        
            if (!Array.isArray(sampleFile)) {
              sampleFile[0] = sampleFile;
            }
        
            for (let i=0;i<sampleFile.length;i++) {
                let file = sampleFile[i]
                let fileUp = await subirUno(file, path + '/' + file.name);
                files.push(fileUp)
              }
              
            return files
        },

        subirElPrimero: async(reqs, path) => {

            let file = "";

            if (!reqs || Object.keys(reqs).length === 0) {
              return file;
            }
        
            let keys = Object.keys(reqs);
            let sampleFile = reqs[keys[0]];
        
            if (Array.isArray(sampleFile)) {
              sampleFile = sampleFile[0];
            }
        
            file = await subirUno(sampleFile, path + '/' + sampleFile.name);
        
            return file

        }
    }
}


export {CrearProcesosArchivos}