import os
import re

# Directory containing the PDF files
directory = './input'  # Change this to your directory

# Regex to match filenames like BE-001.pdf
pattern = re.compile(r'^(BE-)(\d{3})(\.pdf)$', re.IGNORECASE)

for filename in os.listdir(directory):
    match = pattern.match(filename)
    if match:
        prefix, number, extension = match.groups()
        new_number = number.zfill(4)  # Add leading zero to make 4 digits
        new_filename = f"{prefix}{new_number}{extension}"

        # Rename the file
        old_path = os.path.join(directory, filename)
        new_path = os.path.join(directory, new_filename)

        print(f"Renaming: {filename} -> {new_filename}")
        os.rename(old_path, new_path)

print("Renaming complete.")
