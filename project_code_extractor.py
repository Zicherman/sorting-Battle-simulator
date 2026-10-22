import os

def combine_code_files(directory, output_filename):
    ignore_dirs = {'.git', 'node_modules', 'target', 'dist', 'build'}
    valid_extensions = ('.java', '.jsx', '.js', '.css', '.html')

    with open(output_filename, 'w', encoding='utf-8') as outfile:
        for root, dirs, files in os.walk(directory):
            dirs[:] = [d for d in dirs if d not in ignore_dirs]
            
            for file in files:
                if file.endswith(valid_extensions):
                    filepath = os.path.join(root, file)
                    
                    # הוספת קווי הפרדה ושם הקובץ
                    outfile.write("\n" + "-" * 60 + "\n")
                    outfile.write(f"File Name: {file}\n")
                    outfile.write(f"Full Path: {filepath}\n")
                    outfile.write("-" * 60 + "\n\n")
                    
                    try:
                        with open(filepath, 'r', encoding='utf-8', errors='ignore') as infile:
                            outfile.write(infile.read() + "\n")
                    except Exception as e:
                        outfile.write(f"[שגיאה בקריאת הקובץ: {e}]\n")

combine_code_files('.', 'clean_code_combined.txt')