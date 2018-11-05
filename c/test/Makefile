CPP=clang++ -std=c++11 -stdlib=libc++
CPPFLAGS=-g -O0
GTEST=../googletest
INC=-I../include -I$(GTEST)/googletest/include
LIB=-L../obj -L$(GTEST)/lib
DEPS=crctest.cpp

TESTS=crctest

ALL: $(TESTS)

crctest: $(DEPS)
	$(CPP) $(CPPFLAGS) $(INC) crctest.cpp $(LIB) -o $@ -lldpc802 -lstdc++ -lgtest

clean:
	$(RM) $(TESTS)
