#
# Copyright (C) 2022 Nethesis S.r.l.
# http://www.nethesis.it - nethserver@nethesis.it
#
# This script is part of NethServer.
#
# NethServer is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License,
# or any later version.
#
# NethServer is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with NethServer.  If not, see COPYING.
#

import ldap3

class LdapclientBase:

    def __init__(self, host, port, bind_dn, bind_password, base_dn, schema, **kwargs):
        self.host = host
        self.port = int(port)
        self.bind_dn = bind_dn
        self.bind_password = bind_password
        self.base_dn = base_dn
        self.schema = schema
        self.extra_args = kwargs

        self.ldapsrv = ldap3.Server(self.host, port=self.port)
        self.ldapconn = ldap3.Connection(self.ldapsrv,
            user=self.bind_dn or None,
            password=self.bind_password or None,
            client_strategy=ldap3.SAFE_SYNC,
            auto_bind=True,
            raise_exceptions=True,
            auto_range=True,
            auto_referrals=False,
        )

    def __enter__(self):
        pass

    def __exit__(self, exc_type, exc_value, traceback):
        if not self.ldapconn.closed:
            self.ldapconn.unbind()

    def get_entry_description(entry):
        try:
            return entry['attributes']['description'][0]
        except IndexError:
            return ""