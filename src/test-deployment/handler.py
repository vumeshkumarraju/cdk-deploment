import json 

def handler(event, context):
    return {
        "statusCode": 200,
        "body": json.dumps({
            "message":"This is a test route for deployment automation"
        })
    }