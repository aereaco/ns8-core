#!/bin/bash

set -e

image1="cplane-nsdc"
container=$(buildah from scratch)
buildah copy "${container}" module-events /module-events
buildah copy "${container}" nsdc.service /nsdc.service
buildah config --entrypoint=/ "${container}"
buildah commit "${container}" "${image1}"

image2="nsdc"
container=$(buildah from ubuntu:rolling)
buildah run "${container}" -- bash <<EOF
apt-get update
apt-get -y install samba winbind
apt-get clean
find /var/lib/apt/lists/ -type f -delete
EOF
buildah config --cmd=/init.sh "${container}"
buildah copy "${container}" init.sh /init.sh
buildah commit "${container}" "${image2}"

echo
echo "Publish the image with:"
echo
echo " buildah push ${image1} docker://ghcr.io/nethserver/${image1}:latest"
echo " buildah push ${image2} docker://ghcr.io/nethserver/${image2}:latest"
