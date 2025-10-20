import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def chatbot_view(request):
    if request.method == "GET":
        try:
            response = requests.get("https://yesno.wtf/api")
            if response.status_code == 200:
                data = response.json()
                return JsonResponse(data)
            else:
                return JsonResponse({"error": "No se pudo obtener respuesta de la API"}, status=500)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Método no permitido"}, status=405)
