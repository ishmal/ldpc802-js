GTEST=../googletest

ifeq ($(OS),OSX)
CLANG=/usr/lib/llvm-4.0
CPP=$(CLANG)/bin/clang++ -std=c++11 -stdlib=libc++
CPPFLAGS=-g -O0
INC=-I../include -I$(CLANG)/include -I$(GTEST)/googletest/include
LIB=-L../obj -L$(CLANG)/lib -L$(GTEST)/lib
else
CPP=g++ -std=c++11
CPPFLAGS=-g -O0
INC=-I../include -I$(GTEST)/googletest/include
LIB=-L../obj -L$(GTEST)/lib
endif

DEPS=crctest.cpp ldpcEncoderTest.cpp ldpcDecoderTest.cpp

TESTS=crctest ldpcEncoderTest ldpcDecoderTest

ALL: $(TESTS)

crctest: $(DEPS)
	$(CPP) $(CPPFLAGS) $(INC) crctest.cpp $(LIB) -o $@ -lldpc802 -lstdc++ -lgtest -lpthread

ldpcEncoderTest: $(DEPS)
	$(CPP) $(CPPFLAGS) $(INC) ldpcEncoderTest.cpp $(LIB) -o $@ -lldpc802 -lstdc++ -lgtest -lpthread

ldpcDecoderTest: $(DEPS)
	$(CPP) $(CPPFLAGS) $(INC) ldpcDecoderTest.cpp $(LIB) -o $@ -lldpc802 -lstdc++ -lgtest -lpthread

clean:
	$(RM) $(TESTS)
