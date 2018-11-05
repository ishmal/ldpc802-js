CPP=clang++ -std=c++11 -stdlib=libc++
CPPFLAGS=-g -O0
INC=-I../include
LIB=-L../obj

TESTS=crctest

ALL: $(TESTS)

crctest:
	$(CPP) $(CPPFLAGS) $(INC) crctest.cpp $(LIB) -o $@ -lldpc802 -lstdc++ -lgtest

clean:
	$(RM) $(TESTS)
