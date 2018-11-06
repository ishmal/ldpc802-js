
CC=gcc
CFLAGS=-Wall -g
CPP=clang++ -std=c++11 -stdlib=libc++
CPPFLAGS=-g -O0
INC=-Iinclude
LIB=-Lobj

OBJ=\
	obj/ldpc802.o \
	obj/crc32.o

DEPS=\
	include/ldpc802.h src/ldpc802.c\
	include/crc32.h src/crc32.c


ALL: obj/libldpc802.a

obj/libldpc802.a: $(OBJ)
	$(AR) rcs $@ $(OBJ)

obj/ldpc802.o: $(DEPS)
	$(CC) $(CFLAGS) $(INC) -c -o $@ src/ldpc802.c

obj/crc32.o: $(DEPS)
	$(CC) $(CFLAGS) $(INC) -c -o $@ src/crc32.c

tests: test/crctest

test/crctest:
	$(CPP) $(CPPFLAGS) $(INC) test/crctest.cpp $(LIB) -o $@ -lldpc802 -lstdc++ -lgtest

clean:
	$(RM) obj/* test/runner test/*.o test/crctest

