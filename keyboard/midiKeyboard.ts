var getMidiOutput = ()=>{
	return new Promise((res, rej)=>{
		MIDI.loadPlugin({
			soundfontUrl: "./bower_components/midi/ogg/",
			instrument: "acoustic_grand_piano",
			onprogress: function(state, progress) {
				console.log(state, progress);
			},
			onsuccess: function() {
				res(MIDI)
			}
		});
	})
}

class MidiKeyboard {
	midiOutput:any
	midiInput:any
	keyDown = (note, velocity)=>{

	}
	constructor(){

	}
	async init(){
		this.midiOutput = await getMidiOutput()
		this.midiInput = await navigator.requestMIDIAccess()
		var input = null
		console.log("Midi Keyboards:")
		for(var entry of this.midiInput.inputs){
			console.log(entry)
			input = entry[1]
		}
		console.log("Done")
		input.onmidimessage = (event)=>{
			//console.log(event.data)
			var delay = 0; // play one note every quarter second
			var note = event.data[1]; // the MIDI note
			var velocity = event.data[2]; // how hard the note hits
			if(event.data[0] == 144){
				// play the note
				this.midiOutput.setVolume(0, 127);
				this.midiOutput.noteOn(0, note, velocity, delay);
				this.keyDown(note, velocity)
			}else if(event.data[0] == 128){
				this.midiOutput.noteOff(0, note, delay);
			}
		}
	}
}

export default MidiKeyboard