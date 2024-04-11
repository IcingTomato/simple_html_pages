function calculate() {
    let ip = document.getElementById("ip").value.split('.').map(Number);
    let subnet = document.getElementById("subnet").value.split('.').map(Number);

    let subnetAbbr = subnet.map(bin1num).reduce((a, b) => a + b, 0);
    let defaultSubnetMaskAbbr = getDefaultSubnetMaskAbbr(ip[0]);

    // 根据公式计算子网数，并取整
    let subnetNum = Math.pow(2, subnetAbbr - defaultSubnetMaskAbbr);
    subnetNum = Math.floor(subnetNum);

    let hostNum = Math.pow(2, 32 - subnetAbbr) - 2;

    let network = ip.map((octet, index) => octet & subnet[index]);
    let broadcast = subnet.map((octet, index) => (~octet & 0xFF) | network[index]);

    let result = `
        IP地址: ${ip.join('.')}
        子网掩码: ${subnet.join('.')}
        网络地址: ${network.join('.')}
        广播地址: ${broadcast.join('.')}
        子网数: ${subnetNum}
        最大主机数: ${hostNum}
        可用主机数: ${hostNum - 2}
    `;

    document.getElementById("result").innerText = result;
}

function bin1num(num) {
    let count = 0;
    while (num) {
        count += num & 1;
        num >>>= 1;
    }
    return count;
}

function getDefaultSubnetMaskAbbr(firstOctet) {
    if (firstOctet < 128) return 8;  // A类地址
    if (firstOctet < 192) return 16; // B类地址
    return 24; // C类地址，默认情况
}
