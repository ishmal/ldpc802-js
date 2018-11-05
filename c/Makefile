
CC=gcc
INC=-I./include
LIB=-Llib
CFLAGS=-Wall
OBJ=\
	obj/ldpc802.o \
	obj/crc32.o

ALL: obj/ldpc802.a

obj/ldpc802.a: $(OBJ)
	ar vr $@ $(OBJ)

obj/ldpc802.o:
	$(CC) $(CFLAGS) $(INC) -c -o $@ src/ldpc802.C

obj/crc32.o:
	$(CC) $(CFLAGS) $(INC) -c -o $@ src/crc32.C

clean:
	$(RM) obj/*
