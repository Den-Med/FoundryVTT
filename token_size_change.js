let td =_token.document
if (_token.controlled) {
  if (td.width == 1) { size = 2 } else { size = 1 
  }
  td.update({'width':size, 'height':size})
}
