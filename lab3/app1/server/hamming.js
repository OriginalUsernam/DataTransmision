function decode(bits) {
	var z4=(bits[3]+bits[4]+bits[5]+bits[6])%2;
	var z2=(bits[1]+bits[2]+bits[5]+bits[6])%2;
	var z1=(bits[0]+bits[2]+bits[4]+bits[6])%2;
	// var z0 = ...
    
    var errorPosition=z1*1+z2*2+z4*4;
	var errorDetected=false;
	if (errorPosition!=0) 
	errorDetected=true;

	if (errorDetected) {
		bits[errorPosition-1]=parity(bits[errorPosition-1]+1);
	}
    return { errorCorrected: errorDetected, errorPosition: errorPosition-1, bits: bits };
}

parity = function(number){
	return ((number) % 2);
}

exports.decode = decode;
