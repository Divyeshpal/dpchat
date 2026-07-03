import dns from "dns/promises";

try {
  const records = await dns.resolveSrv(
    "_mongodb._tcp.dpchat.z1vag4r.mongodb.net"
  );

  console.log(records);
} catch (err) {
  console.error(err);
}