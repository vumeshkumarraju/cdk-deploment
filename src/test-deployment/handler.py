"""Lambda handler module."""
import json


def handler(event, context):
    """AWS Lambda handler."""
    # pylint: disable=unused-argument
    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": "This is a test route for deployment automation"
        })
    }
