
CC=gcc
INC=-Iinclude
LIB=-Lobj
CFLAGS=-Wall -arch x86_64

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
	$(CC) $(CFLAGS) $(INC) -c -o $@ src/ldpc802.C

obj/crc32.o: $(DEPS)
	$(CC) $(CFLAGS) $(INC) -c -o $@ src/crc32.C

tester:
	$(CC) $(INC) test/*.c $(LIB) -lldpc802 -lc -o test/runner

clean:
	$(RM) obj/* test/runner test/*.o

