
CC=gcc
INC=-I./include
LIB=-L./obj
CFLAGS=-Wall
OBJ=\
	obj/ldpc802.o \
	obj/crc32.o

ALL: obj/libldpc802.a

obj/libldpc802.a: $(OBJ)
	ar vr $@ $(OBJ)

obj/ldpc802.o:
	$(CC) $(CFLAGS) $(INC) -c -o $@ src/ldpc802.C

obj/crc32.o:
	$(CC) $(CFLAGS) $(INC) -c -o $@ src/crc32.C

tester:
	$(CC) $(INC) test/*.c obj/libldpc802.a -lcriterion -o test/runner

clean:
	$(RM) obj/* test/runner test/*.o

