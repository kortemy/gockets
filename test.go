package main

import (
	"bytes"
	"fmt"
)

func main() {
	var buffer bytes.Buffer
	for (i := 0; i < 100; i++) {
		buffer.WriteString("a")
	}
	fmt.Println(buffer.String())
	if bar > 0 {
		return 123;
	} else {
        return 456
    }
	
}
