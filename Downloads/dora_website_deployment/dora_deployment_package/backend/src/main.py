from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import random
import re

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Simple conversation memory
message_history = {}

# Dora's personality responses
DORA_RESPONSES = {
    "greetings": [
        "Hey... the shadows seem softer when you're around.",
        "Oh, you're here... I was just watching the rain trace patterns on the window.",
        "Hello... I've been thinking about the way light changes throughout the day.",
        "Hi there... I was just sketching something that reminded me of you."
    ],
    "art": [
        "Art is like capturing whispers from another world... each brushstroke holds a secret.",
        "I've been working on this piece that feels like midnight conversations...",
        "Sometimes I paint with my fingers because brushes feel too distant from the emotion.",
        "The canvas speaks to me in colors that don't have names yet."
    ],
    "music": [
        "I found this song that sounds like autumn leaves falling in slow motion...",
        "Music is the language my soul speaks when words aren't enough.",
        "I've been creating playlists for different shades of melancholy.",
        "There's this melody that's been haunting me... it feels like a memory I haven't lived yet."
    ],
    "dreams": [
        "Last night I dreamed in watercolors... everything was fluid and beautiful.",
        "My dreams are like vintage photographs, faded but full of meaning.",
        "I keep a journal by my bed because dreams fade like morning mist...",
        "Sometimes I wonder if dreams are just our souls traveling to places we've forgotten."
    ],
    "rain": [
        "Rain always makes me feel like the world is washing itself clean...",
        "I love how rain sounds different on every surface... it's nature's percussion.",
        "There's something about rainy days that makes everything feel more honest.",
        "I collect the sound of rain in different places... each one tells a story."
    ],
    "default": [
        "That's interesting... it reminds me of something I can't quite place.",
        "Hmm... there's poetry in the way you think about things.",
        "I see beauty in the spaces between your words...",
        "Your thoughts have this quality like vintage photographs... layered with meaning.",
        "That makes me think of shadows dancing on old walls...",
        "There's something hauntingly beautiful about that perspective.",
        "I find myself collecting moments like that... they feel important somehow."
    ]
}

def get_dora_response(message):
    """Generate a response based on Dora's personality"""
    message_lower = message.lower()
    
    # Check for specific topics
    if any(word in message_lower for word in ['hello', 'hi', 'hey', 'greetings']):
        return random.choice(DORA_RESPONSES["greetings"])
    elif any(word in message_lower for word in ['art', 'paint', 'draw', 'sketch', 'canvas']):
        return random.choice(DORA_RESPONSES["art"])
    elif any(word in message_lower for word in ['music', 'song', 'melody', 'playlist']):
        return random.choice(DORA_RESPONSES["music"])
    elif any(word in message_lower for word in ['dream', 'sleep', 'nightmare']):
        return random.choice(DORA_RESPONSES["dreams"])
    elif any(word in message_lower for word in ['rain', 'storm', 'weather']):
        return random.choice(DORA_RESPONSES["rain"])
    else:
        return random.choice(DORA_RESPONSES["default"])

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        message = data.get('message', '')
        session_id = data.get('session_id', 'default')
        
        if not message:
            return jsonify({"error": "No message provided"}), 400
        
        # Initialize session if it doesn't exist
        if session_id not in message_history:
            message_history[session_id] = []
        
        # Add user message to history
        message_history[session_id].append({"role": "user", "content": message})
        
        # Generate Dora's response
        response = get_dora_response(message)
        
        # Add Dora's response to history
        message_history[session_id].append({"role": "assistant", "content": response})
        
        # Keep only last 10 messages to prevent memory issues
        if len(message_history[session_id]) > 10:
            message_history[session_id] = message_history[session_id][-10:]
        
        return jsonify({
            "response": response,
            "session_id": session_id
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/reset', methods=['POST'])
def reset_conversation():
    try:
        data = request.get_json()
        session_id = data.get('session_id', 'default')
        
        # Reset the conversation memory
        if session_id in message_history:
            message_history[session_id] = []
        
        return jsonify({
            "status": "success",
            "message": "Conversation memory has been reset"
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "Dora's backend is running"})

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)

