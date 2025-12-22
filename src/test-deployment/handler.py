import json


def handler(event, context):
    """AWS Lambda handler."""
    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": "This is a test route for deployment automation"
        })
    }