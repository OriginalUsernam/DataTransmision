var api = require('./api.js').app;
var hamming = require('./hamming.js');

api.put('/message', function(request, response) {
  var bits = request.body.bits;
  bits = distortBit(bits, 3);

  var decoded = hamming.decode(bits);
  
  if(decoded.errorCorrected){
    response.json('One error corrected on position: '+decoded.errorPosition);
  }
  response.json('Message received without errors');
});

api.listen(3000, function(){
  console.log('CORS-enabled web server is listening on port 3000...');
});

function distortBit(bits, index){
  console.log('Recieved data:  '+ bits)
  bits[index] = (bits[index]+1) % 2;
  console.log('Broken data:   '+ bits + 'on position: ' + index)
  return bits;
}