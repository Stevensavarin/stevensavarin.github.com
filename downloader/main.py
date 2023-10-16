import yt_dlp
import tkinter as tk
from tkinter import messagebox

def download_video():
    url = url_entry.get()
    download_button["state"] = "disabled"  

    def progress_hook(d):
        if d['status'] == 'downloading':
            dots_label["text"] += "."
            if len(dots_label["text"]) > 3:
                dots_label["text"] = "."
        else:
            dots_label["text"] = ""

        if d['status'] == 'finished':
            download_button["state"] = "active"
            messagebox.showinfo("Download Complete", "Video downloaded successfully!")

    ydl_opts = {
        'progress_hooks': [progress_hook],
        'outtmpl': 'video/%(title)s.%(ext)s',
    }

    ydl = yt_dlp.YoutubeDL(ydl_opts)
    ydl.download([url])

root = tk.Tk()
root.title("YouTube Video Downloader by Steven")
root.geometry("400x200")

url_label = tk.Label(root, text="Enter YouTube URL:")
url_label.pack()

url_entry = tk.Entry(root, width=40)
url_entry.pack()

download_button = tk.Button(root, text="Download", command=download_video)
download_button.pack()

dots_label = tk.Label(root, text="", font=("Helvetica", 20))
dots_label.pack()

exit_button = tk.Button(root, text="Exit", command=root.destroy)
exit_button.pack()

root.mainloop()
