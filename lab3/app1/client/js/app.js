var app = new Vue({
    el: '#hamming-encoder',
    data: {
        dataBits: [],
        status: '',
        numberOfDataBits: 4
    },
    created: function () {
        this.initDataBits(4);
    },
    methods: {
        initDataBits: function(){
            this.dataBits=[];
            
            for(var i=0;i<this.numberOfDataBits;i++){
                var bit = { data: null };
                this.dataBits.push(bit);
            }
        },
        send: function () {
            if (this.validate(this.dataBits) === true){
                var encodedMessage = this.encode(this.dataBits);
                this.encode2(this.dataBits);
                // this.status = encodedMessage + ' encoded sent to server';

                return axios.put("http://localhost:3000/message", {bits: encodedMessage}).then(
                    response => (this.status = response.data)
                );
            } else {
                this.status = 'Input is not valid. Please use 0 or 1 as data bit values';
            }
        },
        encode: function(bits){
            // This function must be changed to allow any number of data bits
            // Right now it only works for 4 data bits
            
            var c4=this.parity(parseInt(bits[1].data)+parseInt(bits[2].data)+parseInt(bits[3].data)); // se calculeaza bitul de control de pe pozitia 4
            var c2=this.parity(parseInt(bits[0].data)+parseInt(bits[2].data)+parseInt(bits[3].data)); // se calculeaza bitul de control de pe pozitia 2
            var c1=this.parity(parseInt(bits[0].data)+parseInt(bits[1].data)+parseInt(bits[3].data)); // se calculeaza bitul de control de pe pozitia 1
            // var C0 = this. ...
			console.log("Control bits from encode 1: "+c1+","+c2+","+c4);

            console.log("encode1 output: "+  c1,c2,parseInt(bits[0].data),c4,parseInt(bits[1].data),parseInt(bits[2].data),parseInt(bits[3].data));
            return [c1,c2,parseInt(bits[0].data),c4,parseInt(bits[1].data),parseInt(bits[2].data),parseInt(bits[3].data)]; // vectorul V (cuvantul de transmis)
            
        },
        parity: function(number){
            return number % 2;
        },


        encode2: function(bits){
            var controlBits = [];
            for (var i = 0; i < bits.length-1; i++) {
                var controlBit = this.parity(bits.map(bit => parseInt(bit.data)).reduce((a, b) => a + b) - parseInt(bits[i].data));
                controlBits.push(controlBit);
            }
            controlBits = controlBits.reverse();
            var encodedBits = [];
            for (var i = 0; i < bits.length; i++) {
                encodedBits.push(controlBits[i]);
                encodedBits.push(parseInt(bits[i].data));
            }
            encodedBits = encodedBits.filter(element => element === 0 || element === 1);
            console.log("Control bits from encode 2 : " + controlBits.join(","));
            console.log("encode2 output: "+ encodedBits);
            return encodedBits;
        },
        parity: function(number){
            return number % 2;
        }    
,        



        validate: function(bits){
            for(var i=0; i<bits.length;i++){
                if (this.validateBit(bits[i].data) === false)
                return false;
            }
            return true;
        },
        validateBit: function(character){
            if (character === null) return false;
            return (parseInt(character) === 0 ||
            parseInt(character) === 1);  
        }
    }
})