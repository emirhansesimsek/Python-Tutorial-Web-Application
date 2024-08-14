from django.shortcuts import render
from django.http import HttpResponse
import sys
from io import StringIO
from transformers import pipeline


# Kullanıcıdan girilen python kodunu alır ve cıktı verirken türkçeleştirerek kullanıcıya gösterir.
def run_code(request):
    if request.method == 'POST':
        code = request.POST.get('code', '')

        # alınan çıktı hatasını sakla
        context = {'code': code}  #Context sözlüğü başlat

        if code:
            stdout = sys.stdout
            sys.stdout = StringIO()  # Create a new output buffer

            try:
                exec(code)
                output = sys.stdout.getvalue()  # Başarılı olursa cıktıyı al.
            except Exception as e:
                # Çıktıyı Türkçeleştir.
                pipe = pipeline("translation", model="Helsinki-NLP/opus-mt-tc-big-en-tr")
                error_message = str(e)
                translated_error = pipe(error_message)
                output = translated_error[0]['translation_text']  #Çevirilmiş hata mesajını outputa yaz.

            finally:
                sys.stdout = stdout  # orjinal stdouta geri dön.

            context['output'] = output  # cıktı ve hatayı contexe ekle

        return render(request, 'myapp/run_code.html', context)

    # bunlar hepsi runcode.html sayfasında render edilir.
    return render(request, 'myapp/run_code.html', {'code': '', 'output': None})


def run_code_view(request):
    return render(request, 'myapp/run_code.html')


