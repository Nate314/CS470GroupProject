import os

ignore = [
    '.gitignore', 'package.json', 'package-lock.json', 'tsconfig.json',
    'node_modules', 'compiled', 'dist', 'e2e', '__pycache__',
    '.vscode', '.deliverables', 'README.md',
    'browserslist', '.editorconfig', 'angular.json', 'tslint.json',
    'favicon.ico', 'karma.conf.js', 'main.ts', 'polyfills.ts',
    'test.ts', 'tsconfig.app.json', 'tsconfig.spec.json', 'tslint.json',
    '__init__.py', '.gitkeep'
]

def get_file_names(files, folders, root):
    temp_folders = folders
    for folder in temp_folders:
        if folder not in ignore:
            for file in os.listdir(folder):
                if file not in ignore:
                    if ('.' in file):
                        files.append(f'{folder}/{file}')
                    else:
                        folders.append(f'{folder}/{file}')
    return files

files = get_file_names([], ['bot', 'client', 'service'], '')
print(files)

allfilecontents = ''
i = 0
for file in files:
    i += 1
    with open(file) as reader:
        allfilecontents += reader.read()
        print(i)
print('done reading')
with open('compiledfiles.txt', 'w+') as writer:
    writer.write(allfilecontents)
print('done writing')
