import base64, os

encoded_file = r"C:\dev\darling-martech\services-plan-encoded.txt"
output_file = r"C:\Users\hoosi\Desktop\darling-martech-services-plan.html"

with open(encoded_file, "r") as f:
    b64 = f.read().strip()

html = base64.b64decode(b64)

with open(output_file, "wb") as f:
    f.write(html)

print(f"Written {len(html)} bytes to {output_file}")
